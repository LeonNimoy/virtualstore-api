"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _DeleteProductService = _interopRequireDefault(require("../services/DeleteProductService"));

var _CreateProductService = _interopRequireDefault(require("../services/CreateProductService"));

var _UpdateProductService = _interopRequireDefault(require("../services/UpdateProductService"));

var _ModelPaginationProvider = _interopRequireDefault(require("../../../shared/utils/ModelPaginationProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProductsController {
  async list(req, res) {
    const {
      page = 1,
      size = 20,
      product_id
    } = req.query;
    const pageNumber = Number(page);
    const sizeNumber = Number(size);
    const ProductWithPagination = (0, _ModelPaginationProvider.default)('Product');
    let productsPaginated;
    !product_id ? productsPaginated = await ProductWithPagination.paginate({}, {
      page: pageNumber,
      limit: sizeNumber,
      sort: {
        _id: '-1'
      }
    }) : productsPaginated = await ProductWithPagination.paginate({}, {
      sort: {
        _id: '-1'
      }
    });
    return res.status(200).json(productsPaginated);
  }

  async create(req, res) {
    const {
      name,
      tags,
      description,
      image,
      price,
      quantity
    } = req.body;

    const createProduct = _tsyringe.container.resolve(_CreateProductService.default);

    const product = await createProduct.execute({
      name,
      tags,
      description,
      image,
      price,
      quantity
    });
    return res.status(201).json(product);
  }

  async update(req, res) {
    const {
      id
    } = req.params;
    const {
      name,
      tags,
      description,
      image,
      price,
      quantity
    } = req.body;

    const updateProduct = _tsyringe.container.resolve(_UpdateProductService.default);

    const product = await updateProduct.execute({
      id,
      name,
      tags,
      description,
      image,
      price,
      quantity
    });
    return res.status(200).json(product);
  }

  async delete(req, res) {
    const {
      id
    } = req.params;

    const productDeleted = _tsyringe.container.resolve(_DeleteProductService.default);

    await productDeleted.execute({
      id
    });
    return res.status(200).json({
      message: 'Product deleted!'
    });
  }

}

exports.default = ProductsController;