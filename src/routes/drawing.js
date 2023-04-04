import express from "express";
import { Drawing, validateDrawing } from "../models/drawing.js";
import * as answer from "./answers.js";
import { auth } from "../middleware/auth.js";
import { createMySQLConnection } from "../../mysqlCon.js";

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
    // const userID = req["user"]["_id"];
    // let webPass = await WebPass.findOne({ _id: req.params.id });
    // if (!webPass) return answer.notFound(res);
    // if (webPass["userid"] != userID) return answer.userUnauthorized(res);
    // webPass["name"] = req.body.name;
    // webPass["url"] = req.body.url;
    // webPass["username"] = req.body.username;
    // webPass["pass"] = req.body.pass;
    // webPass["registrationDate"] = req.body.registrationDate;
    // webPass["expirationDate"] = req.body.expirationDate;
    // await webPass.save();
    // res.send(webPass);
  } catch (error) {
    console.log(error.message);
    return answer.badRequest(res, error.message);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    // const userID = req["user"]["_id"];
    // let webPass = await WebPass.findOne({ _id: req.params.id });
    // if (!webPass) return answer.notFound(res);
    // if (webPass["userid"] != userID) return answer.userUnauthorized(res);
    // webPass.remove();
    // res.send(webPass);
  } catch (error) {
    console.log(error.message);
    return answer.badRequest(res, error.message);
  }
});
