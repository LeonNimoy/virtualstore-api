"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
let server;
beforeAll(async () => {
    server = new server_1.default();
    await server.init();
    global.testRequest = supertest_1.default(server.getApp());
});
afterAll(async () => server.close());
//# sourceMappingURL=jest-setup.js.map