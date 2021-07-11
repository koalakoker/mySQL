import express from 'express';
import { Category, validateCategory } from '../models/category';
import * as answer from './answers';
import { auth } from '../middleware/auth';

export const router = express.Router();

router.get('/', auth, async (req, res) => {
  const userID = req['user']['_id'];
  res.send(await Category.find({ userid: userID })
    .select("_id name")
    .sort('name'));
});

router.post('/', auth, async (req, res) => {
  const { error } = validateCategory(req.body);
  if (error) {
    console.log(error.details[0].message);
    return answer.badRequest(res, error.details[0].message);
  }
  try {
    let category = new Category(req.body);
    category['userid'] = req['user']['_id'];
    category = await category.save();
    res.send(category);
  } catch (error) {
    console.log(error.message);
    return answer.badRequest(res, error.message);
  }
});

router.put('/:id', auth, async (req, res) => {
  const { error } = validateCategory(req.body);
  if (error) {
    console.log(error.details[0].message);
    return answer.badRequest(res, error.details[0].message);
  }
  try {
    const userID = req['user']['_id'];
    let category = await Category.findOne({ _id: req.params.id });
    if (!category) return answer.notFound(res);
    if (category['userid'] != userID) return answer.userUnauthorized(res);
    category['name'] = req.body.name;
    await category.save();
    res.send(category);
  } catch (error) {
    console.log(error.message);
    return answer.badRequest(res, error.message);
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const userID = req['user']['_id'];
    let category = await Category.findOne({ _id: req.params.id });
    if (!category) return answer.notFound(res);
    if (category['userid'] != userID) return answer.userUnauthorized(res);
    category.remove();
    res.send(category);
  } catch (error) {
    console.log(error.message);
    return answer.badRequest(res, error.message);
  }
});