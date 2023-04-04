import fetch from "node-fetch";
import { confGet } from "./lib.js";

export async function getData(url = "") {
  const response = await fetch(url, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": confGet("x_auth_code"),
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });
  return response.json();
}

export async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": confGet("x_auth_code"),
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function putData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "PUT",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": confGet("x_auth_code"),
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function deleteData(url = "") {
  const response = await fetch(url, {
    method: "DELETE",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": confGet("x_auth_code"),
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });
  return response.json();
}
