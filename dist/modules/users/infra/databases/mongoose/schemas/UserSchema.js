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
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    phone: {
        type: Number,
    },
    cpf: {
        type: Number,
    },
    addresses_id: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'AddressSchema',
        },
    ],
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
