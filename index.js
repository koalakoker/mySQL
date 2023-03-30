import config from "config";
import fetch from "node-fetch";
import { MySQLcon } from "./mysqlCon.js";

const host = confGet("mysql_dburl");
const user = confGet("mysql_user");
const pass = confGet("mysql_password");
const db = "sketch";

const con = new MySQLcon(host, user, pass, db);
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

function confGet(str) {
  const value = config.get(str);
  if (!value) {
    console.log(
      "Fatal error: '" + str + "' not set in an environment variable"
    );
    process.exit(1);
  }
  return value;
}
