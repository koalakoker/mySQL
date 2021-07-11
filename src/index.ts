import config from 'config';
import cors from 'cors';
import express from 'express';
import Debug from "debug";
import mongoose from 'mongoose';

import { router as links }    from './routes/links';
import { router as users }    from './routes/users';
import { router as auth  }    from './routes/auth';
import { router as webPass }  from './routes/webPass';
import { router as category } from './routes/category';

const debug = Debug("MyApp");
const PORT = process.env.PORT || 5000
const app = express();
const url: string = config.get('dbConnection');

if (!url) {
  console.log("Fatal error: dbConnection not set in an environment variable");
  process.exit(1);
}

if (!config.get('jwtPrivateKey')) {
  console.log("Fatal error: jwtPrivateKey not set in an environment variable");
  process.exit(1);
}

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => {
    console.log("Connected with db...");
  })
mongoose.set('useFindAndModify', false);

app.use(express.json());
app.use(cors({ 'exposedHeaders': ['x-auth-token']}));

app.get('/', (req, res) => {
  res.send("Hello, please use the API");
});

app.use('/api/category', category);
app.use('/api/webpass' , webPass);
app.use('/api/links'   , links);
app.use('/api/users'   , users);
app.use('/api/auth'    , auth);

app.listen(PORT, () => {
  console.log("Starting glink server...");
  console.log(`Listening on ${PORT}`)
});