import { createMySQLConnection } from "../mysqlcon.js";
import { Element } from "../element.js";
import { assert } from "chai";

describe("MySQLcon tests", function () {
  const con = createMySQLConnection();
  it("CURD tests", async function () {
    await CURDtest(con);
  });
  it("Select all from user x", async function () {
    let data = getNewData();
    const user = data.at(0);

    for (let i = 0; i < 10; i++) {
      data = getNewData();
      if (i % 2 == 0) {
        data[0] = user;
      }
      await con.create("drawings", data);
    }

    const results = await con.filterBy("drawings", user);
    assert.equal(results.length, 5);
  });
  it("Truncate test", async function () {
    let data = getNewData();
    const id = await con.create("drawings", data);
    await con.truncate("drawings");
    const results = await con.getAll("drawings");
    assert.equal(results.length, 0);
    con.end();
  });
});

async function CURDtest(con) {
  let data = getNewData();
  const id = await con.create("drawings", data);
  let getElement = await con.get("drawings", id);
  assert.equal(getElement.length, 1);
  assert.equal(getElement[0].user, data.at(0).value);
  assert.equal(getElement[0].name, data.at(1).value);
  assert.equal(getElement[0].drawing, data.at(2).value);

  data = getNewData();
  await con.update("drawings", id, data);

  getElement = await con.get("drawings", id);
  assert.equal(getElement.length, 1);
  assert.equal(getElement[0].user, data.at(0).value);
  assert.equal(getElement[0].name, data.at(1).value);
  assert.equal(getElement[0].drawing, data.at(2).value);

  await con.delete("drawings", id);

  getElement = await con.get("drawings", id);
  assert.equal(getElement.length, 0);
}

function getNewData() {
  const user = getRandomName();
  const name = getRandomName();
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
