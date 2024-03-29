"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComments = exports.deleteComment = exports.addComment = void 0;
const error_1 = require("./../error");
const Comment_1 = __importDefault(require("../models/Comment"));
const Video_1 = __importDefault(require("../models/Video"));
// export const test: RequestHandler = (req, res) => {
//   res.send('test working')
// }
const addComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newComment = new Comment_1.default(Object.assign(Object.assign({}, req.body), { userId: req.user.id }));
    try {
        const savedComment = yield newComment.save();
        res.status(200).send(savedComment);
    }
    catch (error) {
        next(error);
    }
});
exports.addComment = addComment;
const deleteComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comment = yield Comment_1.default.findById(req.params.id);
        const video = yield Video_1.default.findById(req.params.id);
        if (req.user.id === comment.userId || req.user.id === video.userId) {
            yield Comment_1.default.findByIdAndDelete(req.params.id);
            res.status(200).json('Comment Deleted!');
        }
        else {
            return next((0, error_1.createError)(403, 'You can delete only your comment!'));
        }
    }
    catch (error) {
        next(error);
    }
});
exports.deleteComment = deleteComment;
const getComments = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comments = yield Comment_1.default.find({ videoId: req.params.videoId });
        res.status(200).json(comments);
    }
    catch (error) {
        next(error);
    }
});
exports.getComments = getComments;
