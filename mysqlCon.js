import mysql from "mysql";
import config from "config";

export class MySQLcon {
  constructor(host, user, pass, db) {
    this.con = mysql.createConnection({
      host: host,
      user: user,
      password: pass,
      database: db,
    });
    this.con.connect((err) => {
      if (err) throw err;
    });
  }
  async create(table, user, name, drawing) {
    const query =
      "INSERT INTO " +
      table +
      " " +
      this.packValues("(", ", ", ")", "", user.col, name.col, drawing.col) +
      " VALUES " +
      this.packValues(
        "(",
        ", ",
        ")",
        "'",
        user.value,
        name.value,
        drawing.value
      );
    //console.log(query);
    this.con.query(query);
  }
  getAll() {
    this.con.query("SELECT * FROM drawings", (error, results) => {
      if (error) throw error;
      this.displayTable(results);
    });
  }
  end() {
    this.con.end();
  }

  displayTable(table) {
    console.log(
      this.packValues("|", "|", "|", "", "id", "user", "name", "drawing")
    );
    table.forEach((packet) => {
      const row = this.packValues(
        "|",
        "|",
        "|",
        "",
        packet.id,
        packet.user,
        packet.name,
        packet.drawing
      );
      console.log(row);
    });
  }
  packValues(beginStr, separatorStr, endStr, strSeparatorCh, ...args) {
    let str = beginStr;
    for (let i = 0; i < args.length; i++) {
      if (i > 0) {
        str += separatorStr;
      }
      str += this.format(args[i], strSeparatorCh);
    }
    str += endStr;
    return str;
  }
  format(param, strSeparator) {
    return strSeparator + param + strSeparator;
  }
}

export function createMySQLConnection() {
  const host = confGet("mysql_dburl");
  const user = confGet("mysql_user");
  const pass = confGet("mysql_password");
  const db = "sketch";
  return new MySQLcon(host, user, pass, db);
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
