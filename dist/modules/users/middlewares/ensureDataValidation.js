"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var email_validator_1 = __importDefault(require("email-validator"));
var AppError_1 = __importDefault(require("../../../shared/errors/AppError"));
function ensureDataValidation(req, res, next) {
    var _a = req.body, name = _a.name, email = _a.email, password = _a.password;
    if (!email || !password || !name) {
        throw new AppError_1.default('Nome, Email e Senha devem ser informados ', 401);
    }
    var checkEmailFormat = email_validator_1.default.validate(email);
    if (!checkEmailFormat) {
        throw new AppError_1.default('Email inválido!');
    }
    var passwordValidation = new RegExp(/^.{6,}$/);
    var checkPasswordFormat = passwordValidation.test(password);
    if (!checkPasswordFormat) {
        throw new AppError_1.default('A senha deve ter no mínimo de 6 caracteres!');
    }
    return next();
}
exports.default = ensureDataValidation;
