"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("@overnightjs/core");

var _express = _interopRequireDefault(require("express"));

require("express-async-errors");

var _cors = _interopRequireDefault(require("cors"));

var _index = _interopRequireDefault(require("./routes/index.routes"));

var database = _interopRequireWildcard(require("./database"));

require("./container");

var _AppError = _interopRequireDefault(require("./errors/AppError"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SetupServer extends _core.Server {
  constructor(port = 3333) {
    super();
    this.port = port;
  }

  async init() {
    this.setupExpress();
    await this.databaseSetup();
  }

  setupExpress() {
    this.app.use(_express.default.json());
    this.app.use((0, _cors.default)());
    this.app.use(_index.default);
    this.app.use((err, req, res, _) => {
      if (err instanceof _AppError.default) {
        return res.status(err.statusCode).json({
          status: 'error',
          message: err.message
        });
      }

      console.error(err);
      return res.status(500).json({
        status: 'error',
        message: 'Internal Serve Error!'
      });
    });
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