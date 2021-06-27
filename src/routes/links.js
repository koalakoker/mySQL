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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var auth_1 = require("../middleware/auth");
var link_1 = require("../models/link");
var express_1 = __importDefault(require("express"));
var answer = __importStar(require("./answers"));
exports.router = express_1.default.Router();
exports.router.get('/', auth_1.auth, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userID, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                userID = req['user']['_id'];
                _b = (_a = res).send;
                return [4 /*yield*/, link_1.Link.find({ user: userID })
                        .select("_id name href position")
                        .sort('position')];
            case 1:
                _b.apply(_a, [_c.sent()]);
                return [2 /*return*/];
        }
    });
}); });
exports.router.get('/:id', auth_1.auth, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userID, link, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userID = req['user']['_id'];
                return [4 /*yield*/, link_1.Link.find({ _id: req.params.id, user: userID })];
            case 1:
                link = _a.sent();
                if (link.length == 0)
                    return [2 /*return*/, answer.notFound(res)];
                res.send(link);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.log(error_1.message);
                return [2 /*return*/, answer.badRequest(res, error_1.message)];
            case 3: return [2 /*return*/];
        }
    });
}); });
function nextPosition() {
    return __awaiter(this, void 0, void 0, function () {
        var nextPosition, rows;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    nextPosition = 0;
                    return [4 /*yield*/, link_1.Link.find({})];
                case 1:
                    rows = _a.sent();
                    rows.forEach(function (link) {
                        if (link['position'] !== undefined) {
                            if (link['position'] >= nextPosition) {
                                nextPosition = link['position'] + 1;
                            }
                        }
                    });
                    return [2 /*return*/, nextPosition];
            }
        });
    });
}
exports.router.post('/', auth_1.auth, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var error, link, _a, _b, error_2;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                error = link_1.validateLinkPost(req.body).error;
                if (error) {
                    console.log(error.details[0].message);
                    return [2 /*return*/, answer.badRequest(res, error.details[0].message)];
                }
                _c.label = 1;
            case 1:
                _c.trys.push([1, 4, , 5]);
                link = new link_1.Link(req.body);
                _a = link;
                _b = 'position';
                return [4 /*yield*/, nextPosition()];
            case 2:
                _a[_b] = _c.sent();
                link['user'] = req['user']['_id'];
                return [4 /*yield*/, link.save()];
            case 3:
                link = _c.sent();
                res.send(link);
                return [3 /*break*/, 5];
            case 4:
                error_2 = _c.sent();
                console.log(error_2.message);
                return [2 /*return*/, answer.badRequest(res, error_2.message)];
            case 5: return [2 /*return*/];
        }
    });
}); });
exports.router.put('/:id', auth_1.auth, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var error, userID, link, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                error = link_1.validateLinkPut(req.body).error;
                if (error) {
                    console.log(error.details[0].message);
                    return [2 /*return*/, answer.badRequest(res, error.details[0].message)];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                userID = req['user']['_id'];
                return [4 /*yield*/, link_1.Link.findOne({ _id: req.params.id })];
            case 2:
                link = _a.sent();
                if (!link)
                    return [2 /*return*/, answer.notFound(res)];
                if (link['user'] != userID)
                    return [2 /*return*/, answer.userUnauthorized(res)];
                link['name'] = req.body.name;
                link['href'] = req.body.href;
                link['position'] = req.body.position;
                return [4 /*yield*/, link.save()];
            case 3:
                _a.sent();
                res.send(link);
                return [3 /*break*/, 5];
            case 4:
                error_3 = _a.sent();
                console.log(error_3.message);
                return [2 /*return*/, answer.badRequest(res, error_3.message)];
            case 5: return [2 /*return*/];
        }
    });
}); });
exports.router.delete('/:id', auth_1.auth, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userID, link, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userID = req['user']['_id'];
                return [4 /*yield*/, link_1.Link.findOne({ _id: req.params.id })];
            case 1:
                link = _a.sent();
                if (!link)
                    return [2 /*return*/, answer.notFound(res)];
                if (link['user'] != userID)
                    return [2 /*return*/, answer.userUnauthorized(res)];
                link.remove();
                res.send(link);
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                console.log(error_4.message);
                return [2 /*return*/, answer.badRequest(res, error_4.message)];
            case 3: return [2 /*return*/];
        }
    });
}); });
