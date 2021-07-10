import express from 'express';
import { WebPass, validateWebPass } from '../models/webPass';
import * as answer from './answers';
import { auth } from '../middleware/auth';

export const router = express.Router();

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