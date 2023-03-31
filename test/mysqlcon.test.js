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
  let getElement = await con.get("drawings", id);
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

function getRandomName() {
  let str = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  const l = Math.floor(Math.random() * 5) + 5;
  for (let i = 0; i < l; i++) {
    str += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return str;
}
