import * as answer from '../routes/answers'
import { auth } from '../middleware/auth';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import { User, validateUserPost, validateUserPutForAdmin, validateUserPutForUser} from '../models/user';
import express from 'express';
export const router = express.Router();

router.get('/', auth, async (req, res) => {
  if (!req['user']['isAdmin']) return answer.userUnauthorized(res);
  try {
    res.send(await User.find({}).select('-password'));
  } catch (error) {
    return answer.serverError(res);
  }
})

router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req['user']['_id']).select('-password');
    res.send(user);
  } catch (error) {
    console.log(error);
    answer.notFound(res);
  }
});

router.post('/', auth, async (req, res) => {
  if (!req['user']['isAdmin']) return answer.userUnauthorized(res);

  const { error } = validateUserPost(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

  user = new User(_.pick(req.body, ['name', 'email', 'password', 'isAdmin', 'resetpass']));
  const salt = await bcrypt.genSalt(10);
  user['password']  = await bcrypt.hash(user['password'], salt);

  try {
    await user.save();
    const token = user['generateAuthToken']();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));  
  } catch (error) {
    console.log(error.message);
  }
});

router.delete('/:id', auth, async (req, res) => {
  if (!req['user']['isAdmin']) return answer.userUnauthorized(res);
  try {
    let user = await User.findOne({ _id: req.params.id });
    if (!user) return answer.notFound(res);
    user.remove();
    res.send(user);
  } catch (error) {
    console.log(error.message);
    return answer.badRequest(res, error.message);
  }
});

router.put('/:id', auth, async (req, res) => {
  let user;
  try {
    user = await User.findOne({ _id: req.params.id });
    if (!user) return answer.notFound(res);
  } catch (error) {
    console.log(error.message);
    return answer.serverError(res);
  }
  if (!req['user']['isAdmin']) {
    // User
    const { error } = validateUserPutForUser(req.body);
    if (error) {
      console.log(error.details[0].message);
      return answer.badRequest(res, error.details[0].message);
    }
    const userID = req['user']['_id'];
    if (user['userid'] != userID) return answer.userUnauthorized(res);
    user['password'] = req.body.password;
  } else {
    // Admin
    const { error } = validateUserPutForAdmin(req.body);
    if (error) {
      console.log(error.details[0].message);
      return answer.badRequest(res, error.details[0].message);
    }
    user['isAdmin'] = req.body.isAdmin;
    user['resetpass'] = req.body.resetpass;
    try {
      await user.save();
      res.send(user);
    } catch (error) {
      console.log(error.message);
      return answer.badRequest(res, error.message);
    }
  }
});