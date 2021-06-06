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

app.get('/api/links', (req, res) => {
  res.set('Content-Type', 'application/json');
  res.send(JSON.stringify(links));
})

app.put('/api/links/:id', (req, res) => {
  res.send("Put");
})

app.listen(PORT, () => console.log(`Listening on ${PORT}`));