"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthService {
    static async hashPassword(password, salt = 10) {
        return bcrypt_1.default.hash(password, salt);
    }
    static async comparePasswords(password, hashedPassword) {
        return bcrypt_1.default.compare(password, hashedPassword);
    }
    static generateToken(payload) {
        return jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRE_TIME,
        });
    }
}
exports.default = AuthService;
//# sourceMappingURL=authService.js.map