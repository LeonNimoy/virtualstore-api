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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var UpdateUserService_1 = __importDefault(require("./UpdateUserService"));
var FakeUsersRepository_1 = __importDefault(require("../repositories/fakes/FakeUsersRepository"));
var CreateUserService_1 = __importDefault(require("./CreateUserService"));
var AppError_1 = __importDefault(require("../../../shared/errors/AppError"));
var FakeHashProvider_1 = __importDefault(require("../providers/HashUser/fakes/FakeHashProvider"));
describe('UpdateUser', function () {
    it('should be able to update a user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var fakeUserRepository, hashPassword, createUserService, oldUserData, updateUser, userUpdated;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fakeUserRepository = new FakeUsersRepository_1.default();
                    hashPassword = new FakeHashProvider_1.default();
                    createUserService = new CreateUserService_1.default(fakeUserRepository, hashPassword);
                    return [4 /*yield*/, createUserService.execute({
                            name: 'John Doe',
                            email: 'john@gmail.com',
                            password: '123456',
                            phone: 965689,
                            cpf: 963454212,
                            address: '10 Downing Street',
                        })];
                case 1:
                    oldUserData = _a.sent();
                    updateUser = new UpdateUserService_1.default(fakeUserRepository, hashPassword);
                    return [4 /*yield*/, updateUser.execute({
                            id: oldUserData.id,
                            name: 'John Doe',
                            email: 'john@gmail.com',
                            password: '123456',
                            phone: 965689,
                            cpf: 963454212,
                            address: '10 Downing Street',
                        })];
                case 2:
                    userUpdated = _a.sent();
                    expect(userUpdated).toEqual(expect.objectContaining(userUpdated));
                    return [2 /*return*/];
            }
        });
    }); });
    it("should not be able to update a user that doesn't exist", function () { return __awaiter(void 0, void 0, void 0, function () {
        var fakeUserRepository, hashPassword, updateUser;
        return __generator(this, function (_a) {
            fakeUserRepository = new FakeUsersRepository_1.default();
            hashPassword = new FakeHashProvider_1.default();
            updateUser = new UpdateUserService_1.default(fakeUserRepository, hashPassword);
            expect(updateUser.execute({
                id: undefined,
                name: 'John Doe',
                email: 'john@gmail.com',
                password: '123456',
                phone: 965689,
                cpf: 963454212,
                address: '10 Downing Street',
            })).rejects.toBeInstanceOf(AppError_1.default);
            return [2 /*return*/];
        });
    }); });
    it('should not be able o change the property name, if the input is empty', function () { return __awaiter(void 0, void 0, void 0, function () {
        var fakeUserRepository, hashPassword, createUserService, oldUserData, updateUser, userUpdated;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fakeUserRepository = new FakeUsersRepository_1.default();
                    hashPassword = new FakeHashProvider_1.default();
                    createUserService = new CreateUserService_1.default(fakeUserRepository, hashPassword);
                    return [4 /*yield*/, createUserService.execute({
                            name: 'John Doe',
                            email: 'john@gmail.com',
                            password: '123456',
                            phone: 965689,
                            cpf: 963454212,
                            address: '10 Downing Street',
                        })];
                case 1:
                    oldUserData = _a.sent();
                    updateUser = new UpdateUserService_1.default(fakeUserRepository, hashPassword);
                    return [4 /*yield*/, updateUser.execute({
                            id: oldUserData.id,
                            name: '',
                            email: 'john@gmail.com',
                            password: '123456',
                            phone: 965689,
                            cpf: 963454212,
                            address: '10 Downing Street',
                        })];
                case 2:
                    userUpdated = _a.sent();
                    expect(userUpdated.name).toEqual('John Doe');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not be able o change the property password, if the input is empty', function () { return __awaiter(void 0, void 0, void 0, function () {
        var fakeUserRepository, hashPassword, createUserService, oldUserData, updateUser, userUpdated;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fakeUserRepository = new FakeUsersRepository_1.default();
                    hashPassword = new FakeHashProvider_1.default();
                    createUserService = new CreateUserService_1.default(fakeUserRepository, hashPassword);
                    return [4 /*yield*/, createUserService.execute({
                            name: 'John Doe',
                            email: 'john@gmail.com',
                            password: '123456',
                            phone: 965689,
                            cpf: 963454212,
                            address: '10 Downing Street',
                        })];
                case 1:
                    oldUserData = _a.sent();
                    updateUser = new UpdateUserService_1.default(fakeUserRepository, hashPassword);
                    return [4 /*yield*/, updateUser.execute({
                            id: oldUserData.id,
                            name: 'John Doe',
                            email: 'john@gmail.com',
                            password: '',
                            phone: 965689,
                            cpf: 963454212,
                            address: '10 Downing Street',
                        })];
                case 2:
                    userUpdated = _a.sent();
                    expect(userUpdated.password).toEqual('123456');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not be able o change the property phone, if the input is empty', function () { return __awaiter(void 0, void 0, void 0, function () {
        var fakeUserRepository, hashPassword, createUserService, oldUserData, updateUser, userUpdated;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fakeUserRepository = new FakeUsersRepository_1.default();
                    hashPassword = new FakeHashProvider_1.default();
                    createUserService = new CreateUserService_1.default(fakeUserRepository, hashPassword);
                    return [4 /*yield*/, createUserService.execute({
                            name: 'John Doe',
                            email: 'john@gmail.com',
                            password: '123456',
                            phone: 965689,
                            cpf: 963454212,
                            address: '10 Downing Street',
                        })];
                case 1:
                    oldUserData = _a.sent();
                    updateUser = new UpdateUserService_1.default(fakeUserRepository, hashPassword);
                    return [4 /*yield*/, updateUser.execute({
                            id: oldUserData.id,
                            name: 'John Doe',
                            email: 'john@gmail.com',
                            password: '123456',
                            phone: 0,
                            cpf: 963454212,
                            address: '10 Downing Street',
                        })];
                case 2:
                    userUpdated = _a.sent();
                    expect(userUpdated.phone).toEqual(965689);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not be able o change the property cpf, if the input is empty', function () { return __awaiter(void 0, void 0, void 0, function () {
        var fakeUserRepository, hashPassword, createUserService, oldUserData, updateUser, userUpdated;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fakeUserRepository = new FakeUsersRepository_1.default();
                    hashPassword = new FakeHashProvider_1.default();
                    createUserService = new CreateUserService_1.default(fakeUserRepository, hashPassword);
                    return [4 /*yield*/, createUserService.execute({
                            name: 'John Doe',
                            email: 'john@gmail.com',
                            password: '123456',
                            phone: 965689,
                            cpf: 963454212,
                            address: '10 Downing Street',
                        })];
                case 1:
                    oldUserData = _a.sent();
                    updateUser = new UpdateUserService_1.default(fakeUserRepository, hashPassword);
                    return [4 /*yield*/, updateUser.execute({
                            id: oldUserData.id,
                            name: 'John Doe',
                            email: 'john@gmail.com',
                            password: '123456',
                            phone: 965689,
                            cpf: 0,
                            address: '10 Downing Street',
                        })];
                case 2:
                    userUpdated = _a.sent();
                    expect(userUpdated.cpf).toEqual(963454212);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not be able o change the property address, if the input is empty', function () { return __awaiter(void 0, void 0, void 0, function () {
        var fakeUserRepository, hashPassword, createUserService, oldUserData, updateUser, userUpdated;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fakeUserRepository = new FakeUsersRepository_1.default();
                    hashPassword = new FakeHashProvider_1.default();
                    createUserService = new CreateUserService_1.default(fakeUserRepository, hashPassword);
                    return [4 /*yield*/, createUserService.execute({
                            name: 'John Doe',
                            email: 'john@gmail.com',
                            password: '123456',
                            phone: 965689,
                            cpf: 963454212,
                            address: '10 Downing Street',
                        })];
                case 1:
                    oldUserData = _a.sent();
                    updateUser = new UpdateUserService_1.default(fakeUserRepository, hashPassword);
                    return [4 /*yield*/, updateUser.execute({
                            id: oldUserData.id,
                            name: 'John Doe',
                            email: 'john@gmail.com',
                            password: '123456',
                            phone: 965689,
                            cpf: 963454212,
                            address: '',
                        })];
                case 2:
                    userUpdated = _a.sent();
                    expect(userUpdated.address).toEqual('10 Downing Street');
                    return [2 /*return*/];
            }
        });
    }); });
});
