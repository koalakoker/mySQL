import { auth } from '../middleware/auth';
import { Link, validateUserPost, validateUserPut } from '../models/link'
import express from 'express';
import * as answer from './answers';
export const router = express.Router();

router.get('/', auth, async (req, res) => {
  res.send(await Link.find({})
    .select("_id name href position")
    .sort('position'));
});

router.get('/:id', auth, async (req, res) => {
  try {
    const link = await Link.find({ _id: req.params.id });
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
  const { error } = validateUserPost(req.body);
  if (error) {
    console.log(error.details[0].message);
    return answer.badRequest(res, error.details[0].message);
  }
  try {
    let link = new Link(req.body);
    link['position'] = await nextPosition();
    link = await link.save();
    res.send(link);
  } catch (error) {
    console.log(error.message);
    return answer.badRequest(res, error.message);
  }
});

router.put('/:id', auth, async (req, res) => {
  const { error } = validateUserPut(req.body);
  if (error) {
    console.log(error.details[0].message);
    return answer.badRequest(res, error.details[0].message);
  }
  try {
    const result = await Link.findByIdAndUpdate({ _id: req.params.id },
      { $set: req.body },
      {
        new: true,
        useFindAndModify: false
      });
    if (!result) return answer.notFound(res);
    res.send(result);
  } catch (error) {
    console.log(error.message);
    return answer.badRequest(res, error.message);
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const link = await Link.findByIdAndRemove(req.params.id);
    if (!link) return answer.notFound(res);
    res.send(link);
  } catch (error) {
    console.log(error.message);
    return answer.badRequest(res, error.message);
  }
});