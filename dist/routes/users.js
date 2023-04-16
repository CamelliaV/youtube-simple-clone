"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const verifyToken_1 = require("./../verifyToken");
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
// import { test } from '../controllers/user'
const router = express_1.default.Router();
// router.get('/test', test)
// update user
router.put('/:id', verifyToken_1.verifyToken, user_1.update);
// delete user
router.delete('/:id', verifyToken_1.verifyToken, user_1.deleteUser);
// get a user
router.get('/find/:id', user_1.getUser);
// subscribe a user
router.put('/sub/:id', verifyToken_1.verifyToken, user_1.subscribe);
// unsubscribe a user
router.put('/unsub/:id', verifyToken_1.verifyToken, user_1.unsubscribe);
// like a video
router.put('/like/:videoId', verifyToken_1.verifyToken, user_1.like);
// dislike a video
router.put('/dislike/:videoId', verifyToken_1.verifyToken, user_1.dislike);
exports.default = router;
//# sourceMappingURL=users.js.map