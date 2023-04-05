import { createMySQLConnection } from "../src/connection/mysqlCon.js";
import { Element } from "../src/connection/element.js";
import { getRandomName } from "../src/utils/lib.js";
import { assert } from "chai";

const table = "drawings";

describe("MySQLcon tests", function () {
  const con = createMySQLConnection();
  it("CURD tests", async function () {
    await CURDtest(con);
  });
  it("Select all from user x", async function () {
    let rData = getNewData();
    const user = rData.at(0);

    const insertedItems = [];
    for (let i = 0; i < 10; i++) {
      rData = getNewData();
      if (i % 2 == 0) {
        rData[0] = user;
      }
      const row = await con.create(table, rData);
      insertedItems.push(row.id);
    }

    const results = await con.filterBy(table, user.col, user.value);
    assert.equal(results.length, 5);

    insertedItems.forEach(async (id) => {
      await con.delete(table, id);
    });

    con.end();
  });
});

async function CURDtest(con) {
  let data = getNewData();
  let getElement = await con.create(table, data);
  const id = getElement.id;
  assert.equal(getElement.user, data.at(0).value);
  assert.equal(getElement.name, data.at(1).value);
  assert.equal(getElement.drawing, data.at(2).value);

  data = getNewData();
  await con.update(table, id, data);

  getElement = await con.get(table, id);
  assert.equal(getElement.length, 1);
  assert.equal(getElement[0].user, data.at(0).value);
  assert.equal(getElement[0].name, data.at(1).value);
  assert.equal(getElement[0].drawing, data.at(2).value);

  await con.delete(table, id);

  getElement = await con.get(table, id);
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
