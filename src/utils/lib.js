import config from "config";

export function confGet(str) {
  const value = config.get(str);
  if (!value) {
    console.log(
      "Fatal error: '" + str + "' not set in an environment variable"
    );
    process.exit(1);
  }
  return value;
}

export function getRandomName() {
  let str = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  const l = Math.floor(Math.random() * 5) + 5;
  for (let i = 0; i < l; i++) {
    str += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return str;
}
