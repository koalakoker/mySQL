const Joi = require('joi');
const express = require('express');
const PORT = process.env.PORT || 5000
const app = express();

let links = [
  {
    "id": 0,
    "name": "koalakoker home page",
    "url": "https://www.koalakoker.com"
  },
  {
    "id": 1,
    "name": "Google",
    "url": "https://www.google.it"
  }];
let newId = 2;

app.get('/', (req, res) => {
  res.send("Hello, please use the API");
});

app.get('/api/links', (req, res) => {
  res.json(links);
});

app.get('/api/links/:id', (req, res) => {
  let link = links.find((link) => link.id == req.params.id);
  if (!link) return res.send("Resource not found");
  res.json(link);
});

// Add new element
app.use(express.json())
app.post('/api/links', (req, res) => {
  if (validate(req.body)) return res.send(error.details[0].message);
  link = { 'id': newId, ...req.body };
  newId += 1;
  links.push(link);
  res.json(link);
});

// Update element
app.put('/api/links/:id', (req, res) => {
  const error = validate(req.body);
  if (error) return res.send(error.details[0].message);
  let link = links.find((link) => link.id == req.params.id);
  if (!link) return res.send("Resource not found");
  const index = links.indexOf(link);
  links[index].name = req.body.name;
  links[index].url  = req.body.url;
  res.json(link);
});

app.delete('/api/links/:id', (req, res) => {
  let link = links.find((link) => link.id == req.params.id);
  if (!link) return res.send("Resource not found");
  const index = links.indexOf(link);
  links.splice(index, 1);
  res.json(link);
})

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

function validate(link) {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .max(30)
      .required(),
    url: Joi.string()
      .uri()
      .max(300)
      .required()
  })

  const { error } = schema.validate(link);
  return error;
}