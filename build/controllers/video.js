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
exports.search = exports.getByTag = exports.sub = exports.random = exports.trend = exports.addView = exports.getVideo = exports.deleteVideo = exports.updateVideo = exports.addVideo = void 0;
const error_1 = require("./../error");
const Video_1 = __importDefault(require("../models/Video"));
const User_1 = __importDefault(require("../models/User"));
// create a video
const addVideo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    /// @ts-ignore
    const newVideo = new Video_1.default(Object.assign({ userId: req.user.id }, req.body));
    try {
        const savedVideo = yield newVideo.save();
        res.status(200).json(savedVideo);
    }
    catch (error) {
        next(error);
    }
});
exports.addVideo = addVideo;
// update a video
const updateVideo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const video = yield Video_1.default.findById(req.params.id);
        if (!video)
            return next((0, error_1.createError)(404, 'Video not found'));
        /// @ts-ignore
        if (req.user.id === video.userId) {
            const updatedVideo = yield Video_1.default.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true });
            res.status(200).json(updatedVideo);
        }
        else {
            return next((0, error_1.createError)(403, 'You can update only your video!'));
        }
    }
    catch (error) {
        next(error);
    }
}); // delete a video
exports.updateVideo = updateVideo;
const deleteVideo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const video = yield Video_1.default.findById(req.params.id);
        if (!video)
            return next((0, error_1.createError)(404, 'Video not found'));
        /// @ts-ignore
        if (req.user.id === video.userId) {
            yield Video_1.default.findByIdAndDelete(req.params.id);
            res.status(200).json('Video deleted successfully!');
        }
        else {
            return next((0, error_1.createError)(403, 'You can delete only your video!'));
        }
    }
    catch (error) {
        next(error);
    }
});
exports.deleteVideo = deleteVideo;
// find a video
const getVideo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const video = yield Video_1.default.findById(req.params.id);
        res.status(200).json(video);
    }
    catch (error) {
        next(error);
    }
});
exports.getVideo = getVideo;
// add view
const addView = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Video_1.default.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 }
        });
        res.status(200).json('View incremented!');
    }
    catch (error) {
        next(error);
    }
});
exports.addView = addView;
// trend
const trend = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const videos = yield Video_1.default.find().sort({ views: -1 });
        res.status(200).json(videos);
    }
    catch (error) {
        next(error);
    }
});
exports.trend = trend;
// random
const random = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const videos = yield Video_1.default.aggregate([{ $sample: { size: 40 } }]);
        res.status(200).json(videos);
    }
    catch (error) {
        next(error);
    }
});
exports.random = random;
// sub
const sub = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /// @ts-ignore
        const user = yield User_1.default.findById(req.user.id);
        if (!user)
            return next((0, error_1.createError)(404, 'User not exist'));
        const subscribedChannels = user.subscribedUsers;
        const list = yield Promise.all(subscribedChannels.map(channelId => {
            return Video_1.default.find({ userId: channelId });
        }));
        res.status(200).json(list
            .flat()
            .sort((a, b) => b.createdAt.valueOf() - a.createdAt.valueOf())
        // Also work for minus between new Date()
        );
    }
    catch (error) {
        next(error);
    }
});
exports.sub = sub;
const getByTag = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(req.query.tags)
        if (!req.query.tags)
            res.status(200).json('');
        const tagsString = req.query.tags;
        const tags = tagsString.split(',');
        const videos = yield Video_1.default.find({ tags: { $in: tags } }).limit(20);
        res.status(200).json(videos);
    }
    catch (error) {
        next(error);
    }
});
exports.getByTag = getByTag;
const search = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query.q;
        const videos = yield Video_1.default.find({
            title: { $regex: query, $options: 'i' }
        }).limit(40);
        res.status(200).json(videos);
    }
    catch (error) {
        next(error);
    }
});
exports.search = search;
