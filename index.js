import mysql from "mysql";
import config from "config";
import fetch from "node-fetch";

const host = confGet("mysql_dburl");
const user = confGet("mysql_user");
const pass = confGet("mysql_password");
const db = "sketch";

var con = mysql.createConnection({
  host: host,
  user: user,
  password: pass,
  database: db,
});

con.connect(manageError);
await test();
getAll();
con.end();

async function test() {
  const user = await getRandomName();
  const name = await getRandomName();
  const drawing = {
    w: Math.floor(Math.random() * 800),
    h: Math.floor(Math.random() * 600),
  };
  await create(user, name, JSON.stringify(drawing));
}

async function getRandomName() {
  const response = await fetch(
    "https://random-word-api.herokuapp.com/word?lang=it"
  );
  const text = await response.text();
  return JSON.parse(text)[0];
}

function manageError(err) {
  if (err) throw err;
}

async function create(user, name, drawing) {
  const query =
    "INSERT INTO drawings (user,name,drawing) VALUES " +
    packValues("(", ", ", ")", user, name, drawing);
  con.query(query);
}

function getAll() {
  con.query("SELECT * FROM drawings", (error, results) => {
    if (error) throw error;
    displayTable(results);
  });
}

function displayTable(table) {
  console.log(packValues("|", "|", "|", "id", "user", "name", "drawing"));
  table.forEach((packet) => {
    const row = packValues(
      "|",
      "|",
      "|",
      packet.id,
      packet.user,
      packet.name,
      packet.drawing
    );
    console.log(row);
  });
}

function packValues(bStr, sStr, eStr, ...args) {
  let str = bStr;
  for (let i = 0; i < args.length; i++) {
    if (i > 0) {
      str += sStr;
    }
    str += format(args[i]);
  }
  str += eStr;
  return str;
}

function format(param) {
  return "'" + param + "'";
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
