const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/:id', async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);


  res.render('user/home.ejs', {user});
})

router.get('/:id/foods/new', async (req, res) => {
  const userId = req.params.id;

  res.render('food/new.ejs', {userId});
})

router.get('/:id/foods/:foodId', async (req, res) => {
  const userId = req.params.id;
  const foodId = req.params.foodId;

  const user = await User.findById(userId);
  const food = user.pantry.id(foodId);

  res.render('food/show.ejs', {food, userId});
})

router.get('/:id/foods/:foodId/edit', async (req, res) => {
  const userId = req.params.id;
  const foodId = req.params.foodId;

  const user = await User.findById(userId);
  const food = user.pantry.id(foodId);

  res.render('food/edit.ejs', {food, userId});
})

router.post('/:id/foods', async (req, res) => {
  const userId = req.params.id;
  const name = req.body.name;
  const quantity = req.body.quantity;

  const user = await User.findById(userId);
  user.pantry.push({name, quantity});

  await user.save();

  res.redirect(`/users/${userId}`)
})

router.put('/:id/foods/:foodId', async (req, res) => {
  const userId = req.params.id;
  const foodId = req.params.foodId;
  const newName = req.body.name;
  const newQuantity = req.body.quantity;

  const user = await User.findById(userId);
  const food = user.pantry.id(foodId);

  food.name = newName
  food.quantity = newQuantity;

  await user.save();

  res.redirect(`/users/${userId}/foods/${foodId}`);
})

router.delete('/:id/foods/:foodId', async (req, res) => {
  const userId = req.params.id;
  const foodId = req.params.foodId;
  
  const user = await User.findById(userId);

  user.pantry.pull({_id: foodId})

  await user.save();

  res.redirect(`/users/${userId}`);
})

module.exports = router;