import Joi from "joi";
import { Element } from "../../element.js";

export class Drawing extends Array {
  constructor(body) {
    super();
    this.push(new Element("user", body.user));
    this.push(new Element("name", body.name));
    this.push(new Element("drawing", JSON.stringify(body.drawing)));
  }
}

export function validateDrawing(drawing) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    drawing: Joi.string().min(2).max(10000).required(),
  });

  return schema.validate(drawing);
}
