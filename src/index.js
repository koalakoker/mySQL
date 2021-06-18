"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var links_1 = require("./links");
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var debug_1 = __importDefault(require("debug"));
var mongoose_1 = __importDefault(require("mongoose"));
var debug = debug_1.default("MyApp");
var PORT = process.env.PORT || 5000;
var app = express_1.default();
mongoose_1.default.connect('mongodb://localhost:27017/Links', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(function () {
    console.log("Connected with db...");
});
mongoose_1.default.set('useFindAndModify', false);
app.use(express_1.default.json());
app.use(cors_1.default());
app.get('/', function (req, res) {
    res.send("Hello, please use the API");
});
app.use('/api/links', links_1.router);
app.listen(PORT, function () {
    console.log("Starting glink server...");
    console.log("Listening on " + PORT);
});
