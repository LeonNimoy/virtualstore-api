"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var TypedPaginateModel = function (name) {
    return mongoose_1.model(name);
};
exports.default = TypedPaginateModel;
