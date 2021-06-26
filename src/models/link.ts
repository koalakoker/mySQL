import Joi from 'joi';
import mongoose from 'mongoose';

const linkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  href: { 
    type: String, 
    required: true,
    minlenght: 5,
    maxlenght: 255 
  },
  position: {
    type: Number,
    required: true
  }
});

export const Link = mongoose.model('links', linkSchema);

export function validateUserPost(link) {
  const schema = Joi.object({
    name:  Joi.string().min(5).max(50) .required(),
    href:  Joi.string().min(5).max(255).required().uri()
  })

  return schema.validate(link);
}

export function validateUserPut(link) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50) .required(),
    href: Joi.string().min(5).max(255).required().uri(),
    position: Joi.number().min(0).max(1000000)
  })
  
  return schema.validate(link);;
}