import Joi from "joi";

export function validateDrawing(drawing) {
  const schema = Joi.object({
    user: Joi.string().min(3).max(255).required(),
    name: Joi.string().min(3).max(255).required(),
    drawing: Joi.string().min(3).max(10000).required(),
  });

  return schema.validate(drawing);
}
