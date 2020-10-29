"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var email_validator_1 = __importDefault(require("email-validator"));
var AppError_1 = __importDefault(require("../../../shared/errors/AppError"));
function ensureDataValidation(req, res, next) {
    var _a = req.body, email = _a.email, password = _a.password;
    if (!email || !password) {
        throw new AppError_1.default('Email or Password  is missing!', 401);
    }
    var checkEmailFormat = email_validator_1.default.validate(email);
    if (!checkEmailFormat) {
        throw new AppError_1.default('Email format invalid!');
    }
    var passwordValidation = new RegExp(/^.{6,}$/);
    var checkPasswordFormat = passwordValidation.test(password);
    if (!checkPasswordFormat) {
        throw new AppError_1.default('The password must have a minimum of 6 characters!');
    }
    return next();
}
exports.default = ensureDataValidation;
