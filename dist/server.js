"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@overnightjs/core");
const express_1 = __importDefault(require("express"));
const index_routes_1 = __importDefault(require("./routes/index.routes"));
require("./paths/module-alias");
const database = __importStar(require("./database"));
class SetupServer extends core_1.Server {
    constructor(port = 3333) {
        super();
        this.port = port;
    }
    async init() {
        this.setupExpress();
        await this.databaseSetup();
    }
    setupExpress() {
        this.app.use(express_1.default.json());
        this.app.use(index_routes_1.default);
    }
    async databaseSetup() {
        await database.connect();
    }
    async close() {
        await database.close();
    }
    start() {
        this.app.listen(this.port, () => {
            console.info('Server listening on port:', this.port);
        });
    }
    getApp() {
        return this.app;
    }
}
exports.default = SetupServer;
//# sourceMappingURL=server.js.map