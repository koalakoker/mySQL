export function sendNotFound(res) {
  res.status(404).send("The request element can't be found")
}

export function sendBadRequest(res, message) {
  return res.status(400).send(message);
}