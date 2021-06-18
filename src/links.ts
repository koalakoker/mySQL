import * as Joi from 'joi'
import mongoose from 'mongoose';

const linkSchema = new mongoose.Schema({
  href: { type: String, required: true },
  name: { type: String, required: true },
  level: { type: Number, required: true }
});
const Link = mongoose.model('Links', linkSchema);

function sendNotFound(res) {
  res.status(404).send("The request element can't be found")
}

function sendBadRequest(res) {
  return res.status(400).send("The request is not correct");
}

export function init(app) {
  app.get('/api/links', async (req, res) => {
    res.json(await Link.find({}));
  });

  app.get('/api/links/:id', async (req, res) => {
    try {
      const link = await Link.find({ _id: req.params.id });
      if (link.length == 0) return sendNotFound(res);
      res.json(link);
    } catch (error) {
      console.log(error.message);
      return sendBadRequest(res);
    }
  });

  app.post('/api/links', async (req, res) => {
    const error = validate(req.body);
    if (validate(req.body)) {
      console.log(error.details[0].message);
      return sendBadRequest(res);
    }
    try {
      let link = new Link(req.body);
      link = await link.save();
      res.json(link);
    } catch (error) {
      console.log(error.message);
      return sendBadRequest(res);
    }
  });

  app.put('/api/links/:id', async (req, res) => {
    const error = validate(req.body);
    if (error) {
      console.log(error.details[0].message);
      return sendBadRequest(res);
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
      return sendBadRequest(res);
    }
  });

  app.delete('/api/links/:id', async (req, res) => {
    try {
      const link = await Link.findByIdAndRemove(req.params.id);
      if (!link) return sendNotFound(res);
      res.json(link);
    } catch (error) {
      console.log(error.message);
      return sendBadRequest(res);
    }
  })
}

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