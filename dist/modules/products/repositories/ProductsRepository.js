"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dateFns = require("date-fns");

var _dateFnsTz = require("date-fns-tz");

var _ProductSchema = _interopRequireDefault(require("../infra/databases/mongoose/schemas/ProductSchema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProductsRepository {
  async findProductById(product_id) {
    const findProduct = await _ProductSchema.default.findById(product_id);
    return findProduct;
  }

  async checkExistentNameProduct(newProductName) {
    const notAvailableName = await _ProductSchema.default.findOne({
      name: newProductName
    });

    if (!notAvailableName) {
      return true;
    }

    return false;
  }

  async saveProduct({
    description,
    image,
    price,
    name,
    quantity,
    tags
  }) {
    const newDate = new Date();
    const timeZone = 'America/Sao_Paulo';
    const dateWithTimeZone = (0, _dateFnsTz.utcToZonedTime)(newDate, timeZone);
    const productCreated = new _ProductSchema.default({
      description,
      image,
      name,
      price,
      quantity,
      tags,
      created_at: (0, _dateFns.format)(dateWithTimeZone, "dd/MM/yyyy '-' HH'h'mm'm'ss's'")
    });
    await productCreated.save();
    return productCreated;
  }

  async updateProduct({
    description,
    image,
    name,
    price,
    quantity,
    tags,
    id
  }) {
    const newDate = new Date();
    const timeZone = 'America/Sao_Paulo';
    const dateWithTimeZone = (0, _dateFnsTz.utcToZonedTime)(newDate, timeZone);
    const productUpdated = await _ProductSchema.default.findByIdAndUpdate(id, {
      description,
      image,
      name,
      price,
      quantity,
      tags,
      updated_at: (0, _dateFns.format)(dateWithTimeZone, "dd/MM/yyyy '-' HH'h'mm'm'ss's'")
    }, {
      new: true
    });
    return productUpdated;
  }

  async deleteProduct(product) {
    await _ProductSchema.default.findByIdAndDelete(product.id);
  }

}

exports.default = ProductsRepository;