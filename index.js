const express = require('express');
const PORT = process.env.PORT || 5000
const app = express();

const Joi = require('joi');
const schema = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  url: Joi.string()
    .uri()
    .max(300)
    .required()
})

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
  res.set('Content-Type', 'application/json');
  res.send(JSON.stringify(links));
})

// Add new element
app.use(express.json()) // for parsing application/json
app.post('/api/links', function (req, res) {
  
  let link = req.body;
  const { error } = schema.validate(link);
  if (error) {
    res.send(error.details[0].message);
    return;
  }

  link = { 'id': newId, ...req.body };
  newId += 1;
  links.push(link);
  res.json(link);
})

app.listen(PORT, () => console.log(`Listening on ${PORT}`));