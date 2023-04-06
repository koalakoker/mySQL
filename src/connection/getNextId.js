import { createMySQLConnection } from "./mysqlCon.js";

export async function getNextId() {
  const con = createMySQLConnection();
  await con.getNextId("drawings");
  con.end();
}

const con = createMySQLConnection();
con.getNextId("drawings").then((nextID) => {
  console.log("Previous value: " + nextID);
  con.setNextId("drawings", nextID + 10).then(() => {
    con.end();
  });
});
