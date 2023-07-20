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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.google = exports.signin = exports.signup = void 0;
const error_1 = require("./../error");
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const salt = bcryptjs_1.default.genSaltSync(10);
        const hash = bcryptjs_1.default.hashSync(req.body.password, salt);
        const newUser = new User_1.default(Object.assign(Object.assign({}, req.body), { password: hash }));
        console.log('new user prepared');
        // console.log(req.body)
        // res.send(req.body)
        yield newUser.save();
        console.log('saved');
        res.status(201).send('User created!');
    }
    catch (error) {
        // console.log(error)
        // next(createError(404, 'Message Test'))
        next(error);
    }
});
exports.signup = signup;
const signin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({ name: req.body.name });
        if (!user)
            return next((0, error_1.createError)(404, 'User not found!'));
        const isCorrect = yield bcryptjs_1.default.compare(req.body.password, user.password);
        if (!isCorrect)
            return next((0, error_1.createError)(400, 'Wrong credentials!'));
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT);
        // const { password, ...others } = user // incorrect
        /// @ts-ignore
        const _a = user === null || user === void 0 ? void 0 : user._doc, { password } = _a, others = __rest(_a, ["password"]);
        res
            .cookie('access_token', token, {
            httpOnly: true,
            maxAge: 86400000
        })
            .status(200)
            .json(others);
    }
    catch (error) {
        next(error);
    }
});
exports.signin = signin;
const google = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield User_1.default.findOne({ email: req.body.email });
        if (!user) {
            const newUser = new User_1.default(Object.assign(Object.assign({}, req.body), { fromGoogle: true }));
            user = yield newUser.save();
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT);
        res
            .cookie('access_token', token, {
            httpOnly: true,
            maxAge: 86400000
        })
            .status(200)
            /// @ts-ignore
            .json(user._doc);
    }
    catch (error) {
        next(error);
    }
});
exports.google = google;
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res
            .cookie('access_token', '', {
            httpOnly: true,
            expires: new Date(0)
        })
            .status(200)
            .send('log out success');
    }
    catch (error) {
        next(error);
    }
});
exports.logout = logout;
