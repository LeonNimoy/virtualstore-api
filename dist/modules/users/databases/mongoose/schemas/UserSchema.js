"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var schema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    cpf: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
}, {
    timestamps: { createdAt: 'created_at' },
    toJSON: {
        transform: function (_, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        },
    },
});
exports.UserSchema = mongoose_1.default.model('User', schema);
