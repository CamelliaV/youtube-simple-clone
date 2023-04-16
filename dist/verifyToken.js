"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const error_1 = require("./error");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token)
        return next((0, error_1.createError)(401, 'Not authenticated!'));
    const callback = (err, user) => {
        if (err)
            return next((0, error_1.createError)(403, 'Token not valid!'));
        // console.log(user)
        req.user = user;
        next();
    };
    jsonwebtoken_1.default.verify(token, process.env.JWT, callback);
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=verifyToken.js.map