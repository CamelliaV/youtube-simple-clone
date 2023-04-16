"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const comment_1 = require("./../controllers/comment");
const verifyToken_1 = require("./../verifyToken");
const express_1 = __importDefault(require("express"));
const comment_2 = require("../controllers/comment");
const router = express_1.default.Router();
router.post('/', verifyToken_1.verifyToken, comment_1.addComment);
router.delete('/:id', verifyToken_1.verifyToken, comment_2.deleteComment);
router.get('/:videoId', comment_1.getComments);
exports.default = router;
//# sourceMappingURL=comments.js.map