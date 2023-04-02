import config from "config";
import cors from "cors";
import express from "express";
import Debug from "debug";

import { router as drawing } from "./routes/drawing.js";

const debug = Debug("MyApp");
const PORT = process.env.PORT || 5000;
const app = express();

if (!config.get("jwtPrivateKey")) {
  console.log("Fatal error: jwtPrivateKey not set in an environment variable");
  process.exit(1);
}

app.use(express.json());
app.use(cors({ exposedHeaders: ["x-auth-token"] }));

app.get("/", (req, res) => {
  res.send("Hello, please use the API");
});

app.use("/api/drawing", drawing);

app.listen(PORT, () => {
  console.log("Starting sketch server...");
  console.log(`Listening on ${PORT}`);
});
