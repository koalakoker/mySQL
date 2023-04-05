import { createMySQLConnection } from "./mysqlCon.js";

export async function truncate() {
  const con = createMySQLConnection();
  await con.truncate("drawings");
  con.end();
}

truncate();
