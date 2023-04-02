import express from "express";
import { validateDrawing } from "../models/drawing.js";
import * as answer from "./answers.js";
import { auth } from "../middleware/auth.js";
import { createMySQLConnection } from "../../mysqlCon.js";
import { Element } from "../../element.js";

export const router = express.Router();

router.get("/", auth, async (req, res) => {
  const userID = req["user"]["_id"];
  const con = createMySQLConnection();
  const results = await con.getAll("drawings");
  con.end();
  res.send(results);
  // res.send(
  //   await WebPass.find({ userid: userID })
  //     .select("_id name url username pass registrationDate expirationDate")
  //     .sort("name")
  // );
});

router.post("/", auth, async (req, res) => {
  const { error } = validateDrawing(req.body);
  if (error) {
    console.log(error.details[0].message);
    return answer.badRequest(res, error.details[0].message);
  }
  try {
    const con = createMySQLConnection();
    const data = [];
    data.push(new Element("user", req["user"]["_id"]));
    data.push(new Element("name", req.body.name));
    data.push(new Element("drawing", JSON.stringify(req.body.drawing)));
    const results = await con.create("drawings", data);
    res.send("ok");
    con.end();

    // let webPass = new WebPass(req.body);
    // webPass["userid"] = req["user"]["_id"];
    // webPass = await webPass.save();
    // res.send(webPass);
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
