import fetch from "node-fetch";
import { createMySQLConnection } from "./mysqlcon.js";

const con = createMySQLConnection();
await test();
con.getAll();
con.end();

async function test() {
  const user = await getRandomName();
  const name = await getRandomName();
  const drawing = {
    w: Math.floor(Math.random() * 800),
    h: Math.floor(Math.random() * 600),
  };
  await con.create(
    "drawings",
    { col: "user", value: user },
    { col: "name", value: name },
    { col: "drawing", value: JSON.stringify(drawing) }
  );
}

async function getRandomName() {
  const response = await fetch(
    "https://random-word-api.herokuapp.com/word?lang=it"
  );
  const text = await response.text();
  return JSON.parse(text)[0];
}
