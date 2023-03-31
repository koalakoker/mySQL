import fetch from "node-fetch";
import { createMySQLConnection } from "../mysqlcon.js";
import { Element } from "../element.js";
import { assert } from "chai";

describe("MySQLcon tests", function () {
  it("CURD tests", async function () {
    const con = createMySQLConnection();
    await CURDtest(con);
    con.end();
  });
});

async function CURDtest(con) {
  let data = await getNewData();
  const id = await con.create("drawings", data);
  const getElement = await con.get("drawings", id);
  assert.equal(getElement.length, 1);
  assert.equal(getElement[0].user, data.at(0).value);
  assert.equal(getElement[0].name, data.at(1).value);
  assert.equal(getElement[0].drawing, data.at(2).value);

  data = await getNewData();
  await con.update("drawings", id, data);

  getElement = await con.get("drawings", id);
  assert.equal(getElement.length, 1);
  assert.equal(getElement[0].user, data.at(0).value);
  assert.equal(getElement[0].name, data.at(1).value);
  assert.equal(getElement[0].drawing, data.at(2).value);
}

async function getNewData() {
  const user = await getRandomName();
  const name = await getRandomName();
  const drawing = {
    w: Math.floor(Math.random() * 800),
    h: Math.floor(Math.random() * 600),
  };
  const data = [];
  data.push(new Element("user", user));
  data.push(new Element("name", name));
  data.push(new Element("drawing", JSON.stringify(drawing)));
  return data;
}

async function getRandomName() {
  const response = await fetch(
    "https://random-word-api.herokuapp.com/word?lang=it"
  );
  const text = await response.text();
  return JSON.parse(text)[0];
}
