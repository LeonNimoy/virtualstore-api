"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("reflect-metadata");

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IStorageProvider = _interopRequireDefault(require("../../../shared/container/providers/StorageProvider/entities/IStorageProvider"));

var _upload = _interopRequireDefault(require("../../../config/upload"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdateProductImageService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('S3StorageProvider')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IStorageProvider.default === "undefined" ? Object : _IStorageProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class UpdateProductImageService {
  constructor(s3StorageProvider) {
    this.s3StorageProvider = s3StorageProvider;
  }

  async execute({
    imageFilename
  }) {
    const fileUpdated = await this.s3StorageProvider.saveFile(imageFilename);

    if (!fileUpdated) {
      throw new _AppError.default('Formato de Arquivo inválido!', 400);
    }

    const imageUrl = `https://${_upload.default.config.disk.bucket}.s3.amazonaws.com/${imageFilename}`;
    return imageUrl;
  }

}) || _class) || _class) || _class) || _class);
var _default = UpdateProductImageService;
exports.default = _default;