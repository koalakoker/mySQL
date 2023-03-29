import mysql from "mysql";
import config from "config";

const host = confGet("mysql_dburl");
const user = confGet("mysql_user");
const pass = confGet("mysql_password");

var con = mysql.createConnection({
  host: host,
  user: user,
  password: pass,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

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
