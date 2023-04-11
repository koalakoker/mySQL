import { createMySQLConnection } from "./mysqlCon.js";

const con = createMySQLConnection();
con.getNextId("drawings").then((nextID) => {
  console.log("nextID: " + nextID);
  con.end();
  // con.setNextId("drawings", nextID + 10).then(() => {
  //   con.end();
  // });
});
