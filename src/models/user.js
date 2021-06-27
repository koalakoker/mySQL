"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = exports.User = void 0;
var config_1 = __importDefault(require("config"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var joi_1 = __importDefault(require("joi"));
var mongoose_1 = __importDefault(require("mongoose"));
var userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
    },
    isAdmin: {
        type: Boolean,
        required: true
    }
});
userSchema.methods.generateAuthToken = function () {
    return jsonwebtoken_1.default.sign({ _id: this['_id'], isAdmin: this['isAdmin'] }, config_1.default.get('jwtPrivateKey'));
};
exports.User = mongoose_1.default.model('users', userSchema);
function validateUser(user) {
    var schema = joi_1.default.object({
        name: joi_1.default.string().min(5).max(50).required(),
        email: joi_1.default.string().min(5).max(255).required().email(),
        password: joi_1.default.string().min(5).max(255).required(),
        isAdmin: joi_1.default.boolean().required()
    });
    return schema.validate(user);
}
exports.validateUser = validateUser;
