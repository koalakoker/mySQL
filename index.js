import { createMySQLConnection } from "./mysqlCon.js";

const con = createMySQLConnection();
const res = await con.getAll("drawings");
con.displayTable(res);
process.exit(0);
