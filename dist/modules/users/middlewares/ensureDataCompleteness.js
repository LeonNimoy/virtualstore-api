"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var AppError_1 = __importDefault(require("../../../shared/errors/AppError"));
function ensureDataCompleteness(req, res, next) {
    var _a = req.body, name = _a.name, email = _a.email, password = _a.password;
    if (!email || !password || !name) {
        throw new AppError_1.default('Por favor, preencha todos os campos', 401);
    }
    return next();
}
exports.default = ensureDataCompleteness;
