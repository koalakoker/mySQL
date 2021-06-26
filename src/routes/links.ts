import { auth } from '../middleware/auth';
import { Link, validateLinkPost, validateLinkPut } from '../models/link'
import express from 'express';
import * as answer from './answers';
export const router = express.Router();

router.get('/', auth, async (req, res) => {
  const userID = req['user']['_id'];
  res.send(await Link.find({ user: userID })
    .select("_id name href position")
    .sort('position'));
});

router.get('/:id', auth, async (req, res) => {
  try {
    const userID = req['user']['_id'];
    const link = await Link.find({ _id: req.params.id, user: userID });
    if (link.length == 0) return answer.notFound(res);
    res.send(link);
  } catch (error) {
    console.log(error.message);
    return answer.badRequest(res, error.message);
  }
});

async function nextPosition() {
  let nextPosition = 0;
  const rows = await Link.find({});
  rows.forEach(link => {
    if (link['position'] !== undefined) {
      if (link['position'] >= nextPosition) {
        nextPosition = link['position'] + 1;
      }
    }
  });
  return nextPosition;
}

router.post('/', auth, async (req, res) => {
  const { error } = validateLinkPost(req.body);
  if (error) {
    console.log(error.details[0].message);
    return answer.badRequest(res, error.details[0].message);
  }
  try {
    let link = new Link(req.body);
    link['position'] = await nextPosition();
    link['user'] = req['user']['_id'];
    link = await link.save();
    res.send(link);
  } catch (error) {
    console.log(error.message);
    return answer.badRequest(res, error.message);
  }
});

router.put('/:id', auth, async (req, res) => {
  const { error } = validateLinkPut(req.body);
  if (error) {
    console.log(error.details[0].message);
    return answer.badRequest(res, error.details[0].message);
  }
  try {
    const userID = req['user']['_id'];
    let link = await Link.findOne({ _id: req.params.id});
    if (!link) return answer.notFound(res);
    if (link['user'] != userID) return answer.userUnauthorized(res);    
    link['name']     = req.body.name;
    link['href']     = req.body.href;
    link['position'] = req.body.position;
    await link.save();
    res.send(link);
  } catch (error) {
    console.log(error.message);
    return answer.badRequest(res, error.message);
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const userID = req['user']['_id'];
    let link = await Link.findOne({ _id: req.params.id });
    if (!link) return answer.notFound(res);
    if (link['user'] != userID) return answer.userUnauthorized(res);
    link.remove();
    res.send(link);
  } catch (error) {
    console.log(error.message);
    return answer.badRequest(res, error.message);
  }
});