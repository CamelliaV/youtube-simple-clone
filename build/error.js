"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createError = void 0;
class ErrorResponse extends Error {
    constructor(status, message) {
        super();
        this.status = status;
        this.message = message;
    }
}
const createError = (status, message) => {
    return new ErrorResponse(status, message);
};
exports.createError = createError;
