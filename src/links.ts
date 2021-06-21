import * as Joi from 'joi'
import mongoose from 'mongoose';
import express from 'express';
import { sendNotFound, sendBadRequest } from './answers';

export const router = express.Router();

const linkSchema = new mongoose.Schema({
  href    : { type: String, required: true },
  name    : { type: String, required: true },
  level   : { type: Number, required: true },
  position: { type: Number, required: true } 
});
const Link = mongoose.model('Links', linkSchema);

router.get('/', async (req, res) => {
  res.json(await Link.find({}));
});

router.get('/:id', async (req, res) => {
  try {
    const link = await Link.find({ _id: req.params.id });
    if (link.length == 0) return sendNotFound(res);
    res.json(link);
  } catch (error) {
    console.log(error.message);
    return sendBadRequest(res, error.message);
  }
});

router.post('/', async (req, res) => {
  const error = validate(req.body);
  if (validate(req.body)) {
    console.log(error.details[0].message);
    return sendBadRequest(res, error.details[0].message);
  }
  try {
    let nextPosition = 0;
    // Query first to get the last position
    const rows = await Link.find({});
    rows.forEach(link => {
      if (link['position'] !== undefined) {
        if (link['position'] >= nextPosition) {
          nextPosition = link['position'] + 1;
        }
      }
    });

    let link = new Link(req.body);
    link['position'] = nextPosition;
    link = await link.save();
    res.json(link);
  } catch (error) {
    console.log(error.message);
    return sendBadRequest(res, error.message);
  }
});

router.put('/:id', async (req, res) => {
  const error = validate(req.body);
  if (error) {
    console.log(error.details[0].message);
    return sendBadRequest(res, error.details[0].message);
  }
  try {

    const result = await Link.findByIdAndUpdate({ _id: req.params.id },
      { $set: req.body },
      { new: true ,
        useFindAndModify: false});
    if (!result) return sendNotFound(res);
    res.json(result);
  } catch (error) {
    console.log(error.message);
    return sendBadRequest(res, error.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const link = await Link.findByIdAndRemove(req.params.id);
    if (!link) return sendNotFound(res);
    res.json(link);
  } catch (error) {
    console.log(error.message);
    return sendBadRequest(res, error.message);
  }
})

function validate(link) {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .max(30)
      .required(),
    href: Joi.string()
      .uri()
      .max(300)
      .required(),
    level: Joi.number()
      .min(1)
      .max(2)
      .required()
  })

  const { error } = schema.validate(link);
  return error;
}