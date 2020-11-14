"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _products = _interopRequireDefault(require("../../modules/products/infra/routes/products.routes"));

var _users = _interopRequireDefault(require("../../modules/users/infra/routes/users.routes"));

var _sessions = _interopRequireDefault(require("../../modules/users/infra/routes/sessions.routes"));

var _addresses = _interopRequireDefault(require("../../modules/users/infra/routes/addresses.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import checkoutsRouter from '@modules/purchase/infra/routes/checkout.routes';
// import cartsRouter from '@modules/purchase/infra/routes/cart.routes';
const routes = (0, _express.Router)();
routes.use('/products', _products.default);
routes.use('/users', _users.default);
routes.use('/sessions', _sessions.default);
routes.use('/addresses', _addresses.default); // routes.use('/checkouts', checkoutsRouter);
// routes.use('/carts', cartsRouter);

routes.use('/', async (req, res) => {
  try {
    res.status(200).send('API is working!!!');
  } catch (error) {
    res.status(500).json({
      error: 'Something went wrong'
    });
  }
});
var _default = routes;
exports.default = _default;