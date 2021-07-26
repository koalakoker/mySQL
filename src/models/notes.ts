import Joi from 'joi';
import mongoose from 'mongoose';

const notesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255
  },
  content: {
    type: String,
    required: true,
    maxlenght: 4000
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  }
});

export const Notes = mongoose.model('notes', notesSchema);

export function validateNotes(note) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(255).required(),
    content: Joi.string().min(3).max(255).required(),
  })

  return schema.validate(note);
}