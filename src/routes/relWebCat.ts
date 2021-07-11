import express from 'express';
import { RelWebCat, validaterelWebCat } from '../models/relWebCat';
import * as answer from './answers';
import { auth } from '../middleware/auth';

export const router = express.Router();

router.get('/', auth, async (req, res) => {
  const userID = req['user']['_id'];
  res.send(await RelWebCat.find({ userid: userID })
    .select("_id id_web id_cat enabled"));
});

router.post('/', auth, async (req, res) => {
  const { error } = validaterelWebCat(req.body);
  if (error) {
    console.log(error.details[0].message);
    return answer.badRequest(res, error.details[0].message);
  }
  try {
    let relWebCat = new RelWebCat(req.body);
    relWebCat['userid'] = req['user']['_id'];
    relWebCat = await relWebCat.save();
    res.send(relWebCat);
  } catch (error) {
    console.log(error.message);
    return answer.badRequest(res, error.message);
  }
});

router.put('/:id', auth, async (req, res) => {
  const { error } = validaterelWebCat(req.body);
  if (error) {
    console.log(error.details[0].message);
    return answer.badRequest(res, error.details[0].message);
  }
  try {
    const userID = req['user']['_id'];
    let relWebCat = await RelWebCat.findOne({ _id: req.params.id });
    if (!relWebCat) return answer.notFound(res);
    if (relWebCat['userid'] != userID) return answer.userUnauthorized(res);
    relWebCat['id_web'] = req.body.id_web;
    relWebCat['id_cat'] = req.body.id_cat;
    relWebCat['enabled'] = req.body.enabled;
    await relWebCat.save();
    res.send(relWebCat);
  } catch (error) {
    console.log(error.message);
    return answer.badRequest(res, error.message);
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const userID = req['user']['_id'];
    let relWebCat = await RelWebCat.findOne({ _id: req.params.id });
    if (!relWebCat) return answer.notFound(res);
    if (relWebCat['userid'] != userID) return answer.userUnauthorized(res);
    relWebCat.remove();
    res.send(relWebCat);
  } catch (error) {
    console.log(error.message);
    return answer.badRequest(res, error.message);
  }
});