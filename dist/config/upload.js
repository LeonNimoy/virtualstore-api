"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var multer_1 = __importDefault(require("multer"));
var path_1 = __importDefault(require("path"));
var tmpFolder = path_1.default.join(process.cwd(), '..', '..', 'tmp');
exports.default = {
    driver: process.env.STORAGE_DRIVER,
    tmpFolder: tmpFolder,
    multer: {
        storage: multer_1.default.diskStorage({
            destination: tmpFolder,
            filename: function (request, file, callback) {
                var filename = file.originalname;
                return callback(null, filename);
            },
        }),
    },
    config: {
        disk: {
            bucket: process.env.AWS_BUCKET_PRODUCT_IMAGE,
        },
    },
};
