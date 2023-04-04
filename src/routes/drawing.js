import express from "express";
import { Drawing, validateDrawing } from "../models/drawing.js";
import * as answer from "./answers.js";
import { auth } from "../middleware/auth.js";
import { createMySQLConnection } from "../connection/mysqlCon.js";

export const router = express.Router();

router.get("/", auth, async (req, res) => {
  const userID = req["user"]["_id"];
  const con = createMySQLConnection();
  const results = await con.filterBy("drawings", "user", userID);
  results.sort(function (a, b) {
    let x = a.name.toLowerCase();
    let y = b.name.toLowerCase();
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  });
  res.send(results);
  con.end();
});

router.post("/", auth, async (req, res) => {
  const { error } = validateDrawing(req.body);
  if (error) {
    console.log(error.details[0].message);
    return answer.badRequest(res, error.details[0].message);
  }
  try {
    const con = createMySQLConnection();
    req.body.user = req["user"]["_id"];
    const drawing = new Drawing(req.body);
    const results = await con.create("drawings", drawing);
    res.send(JSON.stringify(results));
    con.end();
  } catch (error) {
    console.log(error.message);
    return answer.badRequest(res, error.message);
  }
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validateDrawing(req.body);
  if (error) {
    console.log(error.details[0].message);
    return answer.badRequest(res, error.details[0].message);
  }
  try {
    const con = createMySQLConnection();
    const userID = req["user"]["_id"];
    let drawings = await con.get("drawings", req.params.id);
    if (drawings.length == 0) return answer.notFound(res);
    const drawing = drawings[0];
    if (drawing["user"] != userID) return answer.userUnauthorized(res);
    req.body.user = drawing["user"];
    const newData = new Drawing(req.body);
    res.send(await con.update("drawings", req.params.id, newData));
    con.end();
  } catch (error) {
    console.log(error.message);
    return answer.badRequest(res, error.message);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const con = createMySQLConnection();
    const userID = req["user"]["_id"];
    let drawings = await con.get("drawings", req.params.id);
    if (drawings.length == 0) return answer.notFound(res);
    const drawing = drawings[0];
    if (drawing["user"] != userID) return answer.userUnauthorized(res);
    await con.delete("drawings", req.params.id);
    res.send(drawings);
    con.end();
  } catch (error) {
    console.log(error.message);
    return answer.badRequest(res, error.message);
  }
});
