"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSchema = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var date_fns_1 = require("date-fns");
var schema = new mongoose_1.default.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    tags: {
        type: [String],
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Minimum of one unit'],
    },
    created_at: {
        type: String,
        default: date_fns_1.format(Date.now(), "dd/MM/yyyy '-' HH'h'mm'm'ss's'"),
    },
    updated_at: {
        type: String,
        default: date_fns_1.format(new Date(), "dd/MM/yyyy '-' HH'h'mm'm'ss's'"),
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
exports.ProductSchema = mongoose_1.default.model('Product', schema);
