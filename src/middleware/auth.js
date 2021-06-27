"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
var config_1 = __importDefault(require("config"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function auth(req, res, next) {
    var token = req.header('x-auth-token');
    if (!token)
        return res.status(401).send('Access denied. No token provided.');
    try {
        var decoded = jsonwebtoken_1.default.verify(token, config_1.default.get('jwtPrivateKey'));
        req.user = decoded;
        next();
    }
    catch (ex) {
        return res.status(400).send('Invalid token.');
    }
}
exports.auth = auth;
