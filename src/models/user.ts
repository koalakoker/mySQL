import config from 'config';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
  resetpass: {
    type: Boolean,
    required: true
  }
});

userSchema.methods.generateAuthToken = function() {
  return jwt.sign({ _id: this['_id'], isAdmin: this['isAdmin'] }, config.get('jwtPrivateKey'));
}

export const User = mongoose.model('users', userSchema);

export function validateUserPutForUser(user) {
  const schema = Joi.object({
    name      : Joi.string().min(5).max(50) .required(),
    password  : Joi.string().min(5).max(255).required()
  });

  return schema.validate(user);
}

export function validateUserPutForAdmin(user) {
  const schema = Joi.object({
    isAdmin   : Joi.boolean().required(),
    resetpass : Joi.boolean().required()
  });

  return schema.validate(user);
}

export function validateUserPost(user) {
  const schema = Joi.object({
    name      : Joi.string().min(5).max(50) .required(),
    email     : Joi.string().min(5).max(255).required().email(),
    password  : Joi.string().min(5).max(255).required(),
    isAdmin   : Joi.boolean().required(),
    resetpass : Joi.boolean().required()
  });

  return schema.validate(user);
}