import { md5 } from "js-md5";

const auth = () => {
  const pass = "Valantis";
  const date = new Date();
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const timestamp = `${year}${month}${day}`;

  const xAuth = md5(`${pass}_${timestamp}`);

  return xAuth;
};

export const cfg = {
  root: "http://api.valantis.store:40000/",
  auth: auth(),
};
