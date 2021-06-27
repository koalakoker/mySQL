"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLinkPut = exports.validateLinkPost = exports.Link = void 0;
var joi_1 = __importDefault(require("joi"));
var mongoose_1 = __importDefault(require("mongoose"));
var linkSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    href: {
        type: String,
        required: true,
        minlenght: 5,
        maxlenght: 255
    },
    position: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
});
exports.Link = mongoose_1.default.model('links', linkSchema);
function validateLinkPost(link) {
    var schema = joi_1.default.object({
        name: joi_1.default.string().min(5).max(50).required(),
        href: joi_1.default.string().min(5).max(255).required().uri()
    });
    return schema.validate(link);
}
exports.validateLinkPost = validateLinkPost;
function validateLinkPut(link) {
    var schema = joi_1.default.object({
        name: joi_1.default.string().min(5).max(50).required(),
        href: joi_1.default.string().min(5).max(255).required().uri(),
        position: joi_1.default.number().min(0).max(1000000)
    });
    return schema.validate(link);
    ;
}
exports.validateLinkPut = validateLinkPut;
