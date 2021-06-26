import _ from 'lodash';
import { User, validateUser as validate } from '../models/user';
import express from 'express';
export const router = express.Router();

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

  user = new User(_.pick(req.body, ['name', 'email', 'password', 'isAdmin']));

  try {
    await user.save();
    res.send(_.pick(user, ['_id', 'name', 'email']));  
  } catch (error) {
    console.log(error.message);
  }
});