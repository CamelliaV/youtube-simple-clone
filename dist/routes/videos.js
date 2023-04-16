"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const video_1 = require("./../controllers/video");
const verifyToken_1 = require("./../verifyToken");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post('/', verifyToken_1.verifyToken, video_1.addVideo);
router.put('/:id', verifyToken_1.verifyToken, video_1.updateVideo);
router.delete('/:id', verifyToken_1.verifyToken, video_1.deleteVideo);
router.get('/find/:id', video_1.getVideo);
router.put('/view/:id', video_1.addView);
router.get('/trend', video_1.trend);
router.get('/random', video_1.random);
router.get('/sub', verifyToken_1.verifyToken, video_1.sub);
router.get('/tags', video_1.getByTag);
router.get('/search', video_1.search);
exports.default = router;
//# sourceMappingURL=videos.js.map