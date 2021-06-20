import * as Joi from 'joi'
import mongoose from 'mongoose';
import express from 'express';
import { sendNotFound, sendBadRequest } from './answers';

export const router = express.Router();

const configSchema = new mongoose.Schema({
  nextPosition: { type: Number, required: true }
});
const Config = mongoose.model('Config', configSchema);

router.get('/', async (req, res) => {
  res.json(await Config.find({}));
});

router.post('/', async (req, res) => {
  const error = validate(req.body);
  if (validate(req.body)) {
    console.log(error.details[0].message);
    return sendBadRequest(res);
  }
  try {
    let config = new Config(req.body);
    config = await config.save();
    res.json(config);
  } catch (error) {
    console.log(error.message);
    return sendBadRequest(res);
  }
});

router.put('/', async (req, res) => {
  const error = validate(req.body);
  if (error) {
    console.log(error.details[0].message);
    return sendBadRequest(res);
  }
  try {
    // Query
    const rows = await Config.find({});
    
    // Check
    if (rows.length != 1) {
      console.log("Inconsitent DB: config entry must be one");
      res.send("Inconsitent DB: config entry must be one");
      return;
    }

    // Update
    let config = rows[0];
    //config.nextPosition = req.body.nextPosition;

    config = await config.save();
    console.log(config);
    
    res.json(config);
  } catch (error) {
    console.log(error.message);
    return sendBadRequest(res);
  }
});

// router.delete('/:id', async (req, res) => {
//   try {
//     const link = await Link.findByIdAndRemove(req.params.id);
//     if (!link) return sendNotFound(res);
//     res.json(link);
//   } catch (error) {
//     console.log(error.message);
//     return sendBadRequest(res);
//   }
// });

function validate(config) {
  const schema = Joi.object({
    nextPosition: Joi.number()
      .required()
  })

  const { error } = schema.validate(config);
  return error;
}