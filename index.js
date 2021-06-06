const express = require('express');
const PORT = process.env.PORT || 5000
const app = express();

let links = [
  {
    "name": "koalakoker home page",
    "url": "www.koalakoker.com"
  },
  {
    "name": "Google",
    "url": "www.google.it"
  }]

app.get('/', (req, res) => {
  res.send("Hello, please use the API");
});

app.get('/api/links', (req, res) => {
  res.set('Content-Type', 'application/json');
  res.send(JSON.stringify(links));
})

// Add new element
app.use(express.json()) // for parsing application/json
app.post('/api/links', function (req, res, next) {
  // Validate
  links.push(req.body);
  res.json(req.body)
})

app.listen(PORT, () => console.log(`Listening on ${PORT}`));