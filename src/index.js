"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var links_1 = require("./links");
var Joi = __importStar(require("joi"));
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var debug_1 = __importDefault(require("debug"));
var debug = debug_1.default("MyApp");
var PORT = process.env.PORT || 5000;
var app = express_1.default();
app.use(express_1.default.json());
app.use(cors_1.default());
app.get('/', function (req, res) {
    res.send("Hello, please use the API");
});
app.get('/api/links', function (req, res) {
    res.json(links_1.links);
});
app.get('/api/links/:id', function (req, res) {
    var link = links_1.links.find(function (link) { return link.id === parseInt(req.params.id); });
    if (!link)
        return res.send("Resource not found");
    res.json(link);
});
// Add new element
app.post('/api/links', function (req, res) {
    var error = validate(req.body);
    if (validate(req.body))
        return res.send(error.details[0].message);
    var link = __assign({ 'id': links_1.newId() }, req.body);
    links_1.setNewId(links_1.newId() + 1);
    links_1.links.push(link);
    res.json(link);
});
// Update element
app.put('/api/links/:id', function (req, res) {
    var error = validate(req.body);
    if (error)
        return res.send(error.details[0].message);
    var link = links_1.links.find(function (link) { return link.id === parseInt(req.params.id); });
    if (!link)
        return res.send("Resource not found");
    var index = links_1.links.indexOf(link);
    links_1.links[index].name = req.body.name;
    links_1.links[index].href = req.body.href;
    links_1.links[index].level = req.body.level;
    res.json(link);
});
app.delete('/api/links/:id', function (req, res) {
    var link = links_1.links.find(function (link) { return link.id === parseInt(req.params.id); });
    if (!link)
        return res.send("Resource not found");
    var index = links_1.links.indexOf(link);
    links_1.links.splice(index, 1);
    res.json(link);
});
app.listen(PORT, function () {
    console.log("Starting glink server...");
    debug("New Id: " + links_1.newId());
    console.log("Listening on " + PORT);
});
function validate(link) {
    var schema = Joi.object({
        name: Joi.string()
            .min(3)
            .max(30)
            .required(),
        href: Joi.string()
            .uri()
            .max(300)
            .required(),
        level: Joi.number()
            .min(1)
            .max(2)
            .required()
    });
    var error = schema.validate(link).error;
    return error;
}
