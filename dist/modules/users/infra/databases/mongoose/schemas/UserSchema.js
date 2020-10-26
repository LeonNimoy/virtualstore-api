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
    addresses: [
        {
            cep: {
                type: String,
            },
            address: {
                type: String,
            },
            address_2: {
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
        },
    ],
    payment: [
        {
            card_number: {
                type: Number,
            },
            expire_date: {
                type: Date,
            },
            security_code: {
                type: Number,
            },
            owner_name: {
                type: String,
            },
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
