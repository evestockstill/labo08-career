const Recipe = require('../models/Recipe');
const Event = require('../models/Event');
const { Router } = require('express');
require('colors');


module.exports = Router()

  .get('/', (req, res) => {
    let ingredientsQuery = {};
    if(req.query.ingredient) {
      ingredientsQuery = { 'ingredients.name': req.query.ingredient };
    }

    Recipe.find(ingredientsQuery)
      .select({ name: true })
      .then(recipes => res.send(recipes));
  })
  .get('/:id', (req, res) => {
    Promise.all([
      Recipe.findById(req.params.id),
      Event.find({ recipeId: req.params.id })
    ])
      .then(([recipe, events]) => {
        res.send({ ...recipe.toJSON(), events });
      });
  })

  .post('/', async(req, res) => {
    const recipe = await Recipe.create(req.body);
    res.send(recipe);
  })

  .put('/:id', async(req, res) => {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    }); res.send(recipe);
  })


  .patch('/:id', async(req, res) => {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    }); res.send(recipe);
  })

  .delete('/:id', async(req, res) => {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    res.send(recipe);
  });
