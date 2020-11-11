"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _ProductsController = _interopRequireDefault(require("../../controllers/ProductsController"));

var _ProductImageController = _interopRequireDefault(require("../../controllers/ProductImageController"));

var _upload = _interopRequireDefault(require("../../../../config/upload"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const productsRouter = (0, _express.Router)();
const upload = (0, _multer.default)(_upload.default.multer);
const productsController = new _ProductsController.default();
const productImageController = new _ProductImageController.default();
productsRouter.get('/', productsController.list);
productsRouter.post('/', productsController.create);
productsRouter.put('/:id', productsController.update);
productsRouter.delete('/:id', productsController.delete);
productsRouter.post('/image', upload.single('image'), productImageController.update);
var _default = productsRouter;
exports.default = _default;