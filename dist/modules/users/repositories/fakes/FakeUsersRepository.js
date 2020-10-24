"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var UserSchema_1 = require("../../infra/databases/mongoose/schemas/UserSchema");
var FakeUsersRepository = /** @class */ (function () {
    function FakeUsersRepository() {
        this.users = [];
    }
    FakeUsersRepository.prototype.find = function () {
        return __awaiter(this, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, UserSchema_1.UserSchema.find()];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, users];
                }
            });
        });
    };
    FakeUsersRepository.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var userId;
            return __generator(this, function (_a) {
                userId = this.users.find(function (user) { return user.id === id; });
                return [2 /*return*/, userId];
            });
        });
    };
    FakeUsersRepository.prototype.checkEmail = function (newUserEmail) {
        return __awaiter(this, void 0, void 0, function () {
            var notAvailableEmail;
            return __generator(this, function (_a) {
                notAvailableEmail = this.users.find(function (user) { return user.email === newUserEmail; });
                if (!notAvailableEmail) {
                    return [2 /*return*/, true];
                }
                return [2 /*return*/, false];
            });
        });
    };
    FakeUsersRepository.prototype.findByEmail = function (userEmail) {
        return __awaiter(this, void 0, void 0, function () {
            var findUser;
            return __generator(this, function (_a) {
                findUser = this.users.find(function (user) { return user.email === userEmail; });
                return [2 /*return*/, findUser];
            });
        });
    };
    FakeUsersRepository.prototype.save = function (userData) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                user = new UserSchema_1.UserSchema(userData);
                Object.assign(user, userData);
                this.users.push(user);
                return [2 /*return*/, user];
            });
        });
    };
    FakeUsersRepository.prototype.update = function (newUserData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.users.find(function (element) { return element.id === newUserData.id; })) {
                    this.users.map(function (user) { return newUserData === user; });
                }
                return [2 /*return*/, Object.assign(newUserData)];
            });
        });
    };
    FakeUsersRepository.prototype.delete = function (userToDelete) {
        return __awaiter(this, void 0, void 0, function () {
            var findUser;
            return __generator(this, function (_a) {
                findUser = this.users.map(function (user) { return userToDelete.id === user.id; });
                if (findUser) {
                    this.users.splice(0, 1);
                }
                return [2 /*return*/];
            });
        });
    };
    return FakeUsersRepository;
}());
exports.default = FakeUsersRepository;
