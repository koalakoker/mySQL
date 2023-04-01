import express from 'express';
import { Notes, validateNotes } from '../models/notes';
import * as answer from './answers';
import { auth } from '../middleware/auth';

export const router = express.Router();

router.get('/', auth, async (req, res) => {
  const userID = req['user']['_id'];
  res.send(await Notes.find({ userid: userID })
    .select("_id title content")
    .sort('title'));
});

router.post('/', auth, async (req, res) => {
  const { error } = validateNotes(req.body);
  if (error) {
    console.log(error.details[0].message);
    return answer.badRequest(res, error.details[0].message);
  }
  try {
    let note = new Notes(req.body);
    note['userid'] = req['user']['_id'];
    note = await note.save();
    res.send(note);
  } catch (error) {
    console.log(error.message);
    return answer.badRequest(res, error.message);
  }
});

router.put('/:id', auth, async (req, res) => {
  const { error } = validateNotes(req.body);
  if (error) {
    console.log(error.details[0].message);
    return answer.badRequest(res, error.details[0].message);
  }
  try {
    const userID = req['user']['_id'];
    let note = await Notes.findOne({ _id: req.params.id });
    if (!note) return answer.notFound(res);
    if (note['userid'] != userID) return answer.userUnauthorized(res);
    note['title'] = req.body.title;
    note['content'] = req.body.content;
    await note.save();
    res.send(note);
  } catch (error) {
    console.log(error.message);
    return answer.badRequest(res, error.message);
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const userID = req['user']['_id'];
    let note = await Notes.findOne({ _id: req.params.id });
    if (!note) return answer.notFound(res);
    if (note['userid'] != userID) return answer.userUnauthorized(res);
    note.remove();
    res.send(note);
  } catch (error) {
    console.log(error.message);
    return answer.badRequest(res, error.message);
  }
});