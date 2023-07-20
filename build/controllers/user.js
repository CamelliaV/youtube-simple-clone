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
exports.dislike = exports.like = exports.unsubscribe = exports.subscribe = exports.getUser = exports.deleteUser = exports.update = void 0;
const error_1 = require("./../error");
const User_1 = __importDefault(require("../models/User"));
const Video_1 = __importDefault(require("../models/Video"));
// export const test: RequestHandler = (req, res) => {
//   res.send('test working')
// }
// update user
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.params.id === req.user.id) {
        try {
            const updatedUser = yield User_1.default.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true });
            res.status(200).json(updatedUser);
        }
        catch (error) {
            next(error);
        }
    }
    else {
        return next((0, error_1.createError)(403, 'You can update only your account'));
    }
});
exports.update = update;
// delete user
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    /// @ts-ignore
    if (req.params.id === req.user.id) {
        try {
            yield User_1.default.findByIdAndDelete(req.params.id);
            res.status(200).json('User has been deleted.');
        }
        catch (error) {
            next(error);
        }
    }
    else {
        return next((0, error_1.createError)(403, 'You can delete only your account'));
    }
});
exports.deleteUser = deleteUser;
// get a user
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.params.id);
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.getUser = getUser;
// subscribe a user
const subscribe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /// @ts-ignore
        yield User_1.default.findByIdAndUpdate(req.user.id, {
            $push: { subscribedUsers: req.params.id }
        });
        yield User_1.default.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: 1 }
        });
        res.status(200).json('Subscribed!');
    }
    catch (error) {
        next(error);
    }
});
exports.subscribe = subscribe;
// unsubscribe a user
const unsubscribe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /// @ts-ignore
        yield User_1.default.findByIdAndUpdate(req.user.id, {
            $pull: { subscribedUsers: req.params.id }
        });
        yield User_1.default.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: -1 }
        });
        res.status(200).json('Unsubscribed!');
    }
    catch (error) {
        next(error);
    }
});
exports.unsubscribe = unsubscribe;
// like a video
const like = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
        const isLiked = yield Video_1.default.findOne({ _id: videoId, likes: { $in: id } });
        if (isLiked) {
            yield Video_1.default.findByIdAndUpdate(videoId, {
                $pull: { likes: id }
            });
            return res.status(200).json('Canceled like for the video');
        }
        yield Video_1.default.findByIdAndUpdate(videoId, {
            $addToSet: { likes: id },
            $pull: { dislikes: id }
        });
        res.status(200).json('The video has been liked!');
    }
    catch (error) {
        next(error);
    }
});
exports.like = like;
// dislike a videod
const dislike = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
        const isDisliked = yield Video_1.default.findOne({ _id: videoId, dislikes: { $in: id } });
        if (isDisliked) {
            yield Video_1.default.findByIdAndUpdate(videoId, {
                $pull: { dislikes: id }
            });
            return res.status(200).json('Canceled dislike for the video');
        }
        yield Video_1.default.findByIdAndUpdate(videoId, {
            $addToSet: { dislikes: id },
            $pull: { likes: id }
        });
        res.status(200).json('The video has been disliked!');
    }
    catch (error) {
        next(error);
    }
});
exports.dislike = dislike;
