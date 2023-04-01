import Joi, { number } from 'joi';
import mongoose from 'mongoose';

const relWebCatSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  id_web: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'webPass',
    required: true
  },
  id_cat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
    required: true
  },
  enabled: {
    type: Number,
    required: true,
    min: 0,
    max: 1
  }
});

export const RelWebCat = mongoose.model('relWebCat', relWebCatSchema);

export function validaterelWebCat(relWebCat) {
  const schema = Joi.object({
    id_web:  Joi.string().min(3).max(255).required(),
    id_cat:  Joi.string().min(3).max(255).required(),
    enabled: Joi.number().min(0).max(1).required()
  })

  return schema.validate(relWebCat);
}