"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@overnightjs/core");
const User_1 = require("../models/User");
const authService_1 = __importDefault(require("../services/authService"));
const base_1 = __importDefault(require("./base"));
let UsersController = class UsersController extends base_1.default {
    async getProducts(req, resp) {
        try {
            const users = await User_1.User.find({});
            resp.status(200).send(users);
        }
        catch (error) {
            resp.status(500).send({ error: 'Something went wrong' });
        }
    }
    async create(req, resp) {
        try {
            const user = new User_1.User(req.body);
            const newUser = await user.save();
            resp.status(201).send(newUser);
        }
        catch (error) {
            this.sendCreateUpdateErrorResponse(resp, error);
        }
    }
    async authenticate(req, resp) {
        const user = await User_1.User.findOne({ email: req.body.email });
        if (!user) {
            return resp.status(401).send({
                code: 401,
                error: 'User not found!',
            });
        }
        if (!(await authService_1.default.comparePasswords(req.body.password, user.password))) {
            return resp
                .status(401)
                .send({ code: 401, error: 'Password does not match!' });
        }
        const token = authService_1.default.generateToken(user.toJSON());
        return resp.send({ ...user.toJSON(), ...{ token } });
    }
};
__decorate([
    core_1.Get(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getProducts", null);
__decorate([
    core_1.Post(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    core_1.Post('authenticate'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "authenticate", null);
UsersController = __decorate([
    core_1.Controller('users')
], UsersController);
exports.default = UsersController;
//# sourceMappingURL=users.js.map