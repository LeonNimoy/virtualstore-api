"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const server_1 = __importDefault(require("./server"));
(async () => {
    const server = new server_1.default(Number(process.env.APP_PORT));
    await server.init();
    server.start();
})();
//# sourceMappingURL=index.js.map