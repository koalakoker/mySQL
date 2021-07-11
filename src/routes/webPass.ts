import express from 'express';
import { WebPass, validateWebPass } from '../models/webPass';
import * as answer from './answers';
import { auth } from '../middleware/auth';

export const router = express.Router();

router.get('/', auth, async (req, res) => {
  const userID = req['user']['_id'];
  res.send(await WebPass.find({ userid: userID })
    .select("_id name url username pass registrationDate expirationDate")
    .sort('name'));
});

router.post('/', auth, async (req, res) => {
  const { error } = validateWebPass(req.body);
  if (error) {
    console.log(error.details[0].message);
    return answer.badRequest(res, error.details[0].message);
  }
  try {
    let webPass = new WebPass(req.body);
    webPass['userid'] = req['user']['_id'];
    webPass = await webPass.save();
    res.send(webPass);
  } catch (error) {
    console.log(error.message);
    return answer.badRequest(res, error.message);
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const userID = req['user']['_id'];
    let webPass = await WebPass.findOne({ _id: req.params.id });
    if (!webPass) return answer.notFound(res);
    if (webPass['userid'] != userID) return answer.userUnauthorized(res);
    webPass.remove();
    res.send(webPass);
  } catch (error) {
    console.log(error.message);
    return answer.badRequest(res, error.message);
  }
});