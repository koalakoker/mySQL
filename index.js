import { createMySQLConnection, MySQLcon } from "./mysqlCon.js";

const con = createMySQLConnection();
await con.getAll("drawings");
process.exit(0);
