"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressSchema = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var schema = new mongoose_1.default.Schema({
    user_id: {
        type: String,
        required: true,
    },
    cep: {
        type: String,
    },
    address: {
        type: String,
    },
    address_complement: {
        type: String,
    },
    neighborhood: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    created_at: {
        type: String,
    },
    updated_at: {
        type: String,
    },
}, {
    toJSON: {
        transform: function (_, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        },
    },
});
exports.AddressSchema = mongoose_1.default.model('Address', schema);
