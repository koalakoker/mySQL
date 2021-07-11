import Joi from 'joi';
import mongoose from 'mongoose';

const webPassSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255
  },
  url: {
    type: String,
    required: true,
    minlenght: 5,
    maxlenght: 255
  },
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  pass: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255
  },
  registrationDate: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255
  },
  expirationDate: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255
  }
});

export const WebPass = mongoose.model('webPass', webPassSchema);

export function validateWebPass(webPass) {
  const schema = Joi.object({
    name:             Joi.string().min(3).max(255).required(),
    url:              Joi.string().min(3).max(255).required(),
    username:         Joi.string().min(3).max(255).required(),
    pass:             Joi.string().min(3).max(255).required(),
    registrationDate: Joi.string().min(3).max(255).required(),
    expirationDate:   Joi.string().min(3).max(255).required()
  })

  return schema.validate(webPass);
}