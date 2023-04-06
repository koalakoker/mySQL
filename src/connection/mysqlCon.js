import mysql from "mysql";
import { Element } from "./element.js";
import { confGet } from "../utils/lib.js";

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
  query(query) {
    return new Promise((resolve, reject) => {
      this.con.query(query, (error, result) => {
        if (error) reject(error);
        resolve(result);
      });
    });
  }
  async create(table, data) {
    const query =
      "INSERT INTO " +
      table +
      " " +
      this.packValues("(", ", ", ")", "", data, "col") +
      " VALUES " +
      this.packValues("(", ", ", ")", "'", data, "val");
    const result = await this.query(query);
    const insertedRow = await this.get(table, result.insertId);
    return insertedRow.at(0);
  }
  get(table, id) {
    const query = "SELECT * FROM " + table + " WHERE `id`=" + id;
    return this.query(query);
  }
  filterBy(table, col, value) {
    const query =
      "SELECT * FROM " +
      table +
      " WHERE " +
      col +
      " = " +
      this.format(value, '"');
    return this.query(query);
  }
  getAll(table) {
    const query = "SELECT * FROM " + table;
    return this.query(query);
  }
  async update(table, id, data) {
    const query =
      "UPDATE " + table + " SET " + this.setValues(data) + " WHERE `id`=" + id;
    await this.query(query);
    const row = await this.get(table, id);
    return row.at(0);
  }
  delete(table, id) {
    const query = "DELETE FROM " + table + " WHERE `id`=" + id;
    return this.query(query);
  }
  truncate(table) {
    const query = "TRUNCATE " + table;
    return this.query(query);
  }
  async getNextId() {
    const query =
      "SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA = 'sketch' AND TABLE_NAME = 'drawings'";
    const res = await this.query(query);
    return res.at(0).AUTO_INCREMENT;
  }
  setNextId(table, nextId) {
    const query = "ALTER TABLE " + table + " AUTO_INCREMENT = " + nextId;
    return this.query(query);
  }
  end() {
    this.con.end();
  }

  displayTable(table) {
    if (table.length === 0) {
      return;
    }
    const data = [];
    data.push(new Element("id", ""));
    data.push(new Element("user", ""));
    data.push(new Element("name", ""));
    data.push(new Element("drawing", ""));
    console.log(this.packValues("|", "|", "|", "", data, "col"));
    table.forEach((packet) => {
      const data = [];
      data.push(new Element("", packet.id));
      data.push(new Element("", packet.user));
      data.push(new Element("", packet.name));
      data.push(new Element("", packet.drawing));

      const row = this.packValues("|", "|", "|", "", data, "val");
      console.log(row);
    });
  }
  packValues(beginStr, separatorStr, endStr, strSeparatorCh, data, sel) {
    let str = beginStr;
    for (let i = 0; i < data.length; i++) {
      if (i > 0) {
        str += separatorStr;
      }
      str += this.format(data[i].get(sel), strSeparatorCh);
    }
    str += endStr;
    return str;
  }
  setValues(data) {
    let str = "";
    for (let i = 0; i < data.length; i++) {
      if (i > 0) {
        str += ", ";
      }
      str += data[i].col + "='" + data[i].value + "'";
    }
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
