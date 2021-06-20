"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendBadRequest = exports.sendNotFound = void 0;
function sendNotFound(res) {
    res.status(404).send("The request element can't be found");
}
exports.sendNotFound = sendNotFound;
function sendBadRequest(res) {
    return res.status(400).send("The request is not correct");
}
exports.sendBadRequest = sendBadRequest;
