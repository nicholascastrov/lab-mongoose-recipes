const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://0.0.0.0/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    let newRecipe = {
      title: 'PB&J',
      level: 'Amateur Chef',
      ingredients: ['Peanut Butter', 'jelly', 'bread'],
      cuisine: 'American',
      dishType: 'snack',
      image: 'https://media.istockphoto.com/id/1131185755/photo/a-peanut-butter-and-grape-jelly-sandwich-on-a-wooden-cutting-board.jpg?s=612x612&w=is&k=20&c=8wmP1YWP_ydOwCuWQWqjJ0mAuKACj_YFbYxldVF_DM0=',
      duration: 5,
      creator: 'nico'
    }
    return Recipe.create(newRecipe)
  })
  .then(newRecipe => {
    console.log(newRecipe.title)
    return Recipe.insertMany(data)
  })
  .then((recipes)=> {
    recipes.forEach((recipe)=>{
      console.log(recipe.title)
    })
    return Recipe.findOneAndUpdate(
      {title: 'Rigatoni alla Genovese'},
      {duration: 100},
      {new: true}
      );
  })
  .then((updated)=>{
    console.log(`Success`, updated)
    return Recipe.deleteOne({
      title: 'Carrot Cake'
    })
  })
  .then(()=>{
    console.log('Success, Deleted')
      mongoose.connection.close(() => {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
      });
  })
  .catch((error)=>{
    console.log('Error', error)
  })