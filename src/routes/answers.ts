export function notFound(res) {
  res.status(404).send("The request element can't be found")
}

export function badRequest(res, message) {
  return res.status(400).send(message);
}