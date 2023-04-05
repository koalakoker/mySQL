import { assert } from "chai";
import { getData, postData, putData, deleteData } from "../src/utils/api.js";
import { getRandomName } from "../src/utils/lib.js";

const url = "http://localhost:5000/api/drawing/";

describe("API tests", function () {
  it("CURD tests", async function () {
    let rData = newRandomData();
    let data = await postData(url, rData);
    assert.equal(data.name, rData.name);
    assert.equal(data.drawing, rData.drawing);

    const id = data.id;
    const user = data.user;
    let rows = await getData(url + id);
    assert.equal(rows.length, 1);
    data = rows.at(0);
    assert.equal(data.id, id);
    assert.equal(data.user, user);
    assert.equal(data.name, rData.name);
    assert.equal(data.drawing, rData.drawing);

    rData = newRandomData();
    data = await putData(url + id, rData);
    assert.equal(data.name, rData.name);
    assert.equal(data.drawing, rData.drawing);

    rows = await getData(url + id);
    assert.equal(rows.length, 1);
    data = rows.at(0);
    assert.equal(data.id, id);
    assert.equal(data.user, user);
    assert.equal(data.name, rData.name);
    assert.equal(data.drawing, rData.drawing);

    await deleteData(url + id);

    rows = await getData(url + id);
    assert.equal(rows.length, 0);
  });
  it("Get all from user x", async function () {
    let rData;
    const insertedItems = [];
    for (let i = 0; i < 10; i++) {
      rData = newRandomData();
      const data = await postData(url, rData);
      rData.id = data.id;
      rData.user = data.user;
      insertedItems.push(rData);
    }
    const rows = await getData(url);

    insertedItems.forEach(async (item) => {
      const row = rows.find((element) => element.id === item.id);
      assert.isDefined(row);
      assert.deepEqual(row, item);
      await deleteData(url + item.id);
    });
  });
});

function newRandomData() {
  const drawing = {
    w: Math.floor(Math.random() * 800),
    h: Math.floor(Math.random() * 600),
  };
  return {
    name: getRandomName(),
    drawing: JSON.stringify(drawing),
  };
}

// getData("http://localhost:5000/api/drawing").then((data) => {
//   console.log(data);
// });
