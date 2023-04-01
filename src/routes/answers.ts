export function notFound(res) {
  res.status(404).send("The request element can't be found")
}

export function badRequest(res, message) {
  return res.status(400).send(message);
}

export function userUnauthorized(res) {
  return res.status(401).send('User is not authorized.');
}

export function serverError(res) {
  return res.status(500).send('Internal server error.');
}