import Joi from 'joi';
import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
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
});

export const Category = mongoose.model('category', categorySchema);

export function validateCategory(category) {
  const schema = Joi.object({
    name  : Joi.string().min(3).max(255).required()
  })

  return schema.validate(category);
}