import { assert } from "chai";
import { getData, postData, putData, deleteData } from "../src/utils/api.js";
import { getRandomName } from "../src/utils/lib.js";

describe("API tests", function () {
  it("CURD tests", async function () {
    let rData = newRandomData();
    let data = await postData("http://localhost:5000/api/drawing", rData);
    assert.equal(data.name, rData.name);
    assert.equal(data.drawing, rData.drawing);

    rData = newRandomData();
    data = await putData("http://localhost:5000/api/drawing/" + data.id, rData);
    assert.equal(data.name, rData.name);
    assert.equal(data.drawing, rData.drawing);

    await deleteData("http://localhost:5000/api/drawing/" + data.id);

    data = await getData("http://localhost:5000/api/drawing/" + data.id);
    assert.deepEqual(data, {});
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

// const data = {
//   name: "mikerl",
//   drawing: JSON.stringify({ w: 300, h: 200 }),
// };

// const id = 52;

// deleteData("http://localhost:5000/api/drawing/" + id).then((data) => {
//   console.log(data);
// });
