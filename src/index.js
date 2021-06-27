"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __importDefault(require("config"));
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var debug_1 = __importDefault(require("debug"));
var mongoose_1 = __importDefault(require("mongoose"));
var links_1 = require("./routes/links");
var users_1 = require("./routes/users");
var auth_1 = require("./routes/auth");
var debug = debug_1.default("MyApp");
var PORT = process.env.PORT || 5000;
var app = express_1.default();
var url = config_1.default.get('dbConnection');
if (!url) {
    console.log("Fatal error: dbConnection not set in an environment variable");
    process.exit(1);
}
if (!config_1.default.get('jwtPrivateKey')) {
    console.log("Fatal error: jwtPrivateKey not set in an environment variable");
    process.exit(1);
}
mongoose_1.default.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(function () {
    console.log("Connected with db...");
});
mongoose_1.default.set('useFindAndModify', false);
app.use(express_1.default.json());
app.use(cors_1.default({ 'exposedHeaders': ['x-auth-token'] }));
app.get('/', function (req, res) {
    res.send("Hello, please use the API");
});
app.use('/api/links', links_1.router);
app.use('/api/users', users_1.router);
app.use('/api/auth', auth_1.router);
app.listen(PORT, function () {
    console.log("Starting glink server...");
    console.log("Listening on " + PORT);
});
