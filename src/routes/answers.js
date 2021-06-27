"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverError = exports.userUnauthorized = exports.badRequest = exports.notFound = void 0;
function notFound(res) {
    res.status(404).send("The request element can't be found");
}
exports.notFound = notFound;
function badRequest(res, message) {
    return res.status(400).send(message);
}
exports.badRequest = badRequest;
function userUnauthorized(res) {
    return res.status(401).send('User is not authorized.');
}
exports.userUnauthorized = userUnauthorized;
function serverError(res) {
    return res.status(500).send('Internal server error.');
}
exports.serverError = serverError;
