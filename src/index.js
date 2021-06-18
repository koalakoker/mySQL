"use strict";
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
var links = __importStar(require("./links"));
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
links.init(app);
app.listen(PORT, function () {
    console.log("Starting glink server...");
    console.log("Listening on " + PORT);
});
