"use strict";

require("reflect-metadata");

require("dotenv/config");

var _server = _interopRequireDefault(require("./shared/server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(async () => {
  const server = new _server.default(Number(process.env.APP_PORT));
  await server.init();
  server.start();
})();