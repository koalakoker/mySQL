import config from 'config';
import cors from 'cors';
import express from 'express';
import Debug from "debug";
import mongoose from 'mongoose';

import { router as links  } from './links';

const debug = Debug("MyApp");
const PORT = process.env.PORT || 5000
const app = express();
const url = config.get('dbConnection');

if (!url) {
  console.log("Fatal error: dbConnection not set in an environment variable");
  process.exit(1);
}

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected with db...");
  })
mongoose.set('useFindAndModify', false);

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send("Hello, please use the API");
});

app.use('/api/links', links);

app.listen(PORT, () => {
  console.log("Starting glink server...");
  console.log(`Listening on ${PORT}`)
});