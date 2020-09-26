"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = require("../models/User");
class BaseController {
    sendCreateUpdateErrorResponse(resp, error) {
        if (error instanceof mongoose_1.default.Error.ValidationError) {
            const clientErrors = this.handleClientErrors(error);
            resp
                .status(clientErrors.code)
                .send({ code: clientErrors.code, error: clientErrors.error });
        }
        else {
            resp.status(500).send({ code: 500, error: 'Something went wrong!' });
        }
    }
    handleClientErrors(error) {
        const duplicatedKindErrors = Object.values(error.errors).filter(err => err.kind === User_1.CUSTOM_VALIDATION.DUPLICATED);
        if (duplicatedKindErrors.length) {
            return { code: 409, error: error.message };
        }
        return { code: 422, error: error.message };
    }
}
exports.default = BaseController;
//# sourceMappingURL=base.js.map