import { User, validateUser as validate } from '../models/user';
import mongoose from 'mongoose';
import express from 'express';
export const router = express.Router();

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    isAdmin: req.body.isAdmin
  });

  try {
    await user.save();
    res.send(user);  
  } catch (error) {
    console.log(error.message);
  }
});