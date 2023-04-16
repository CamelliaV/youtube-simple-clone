"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const users_1 = __importDefault(require("./routes/users"));
const videos_1 = __importDefault(require("./routes/videos"));
const comments_1 = __importDefault(require("./routes/comments"));
const auth_1 = __importDefault(require("./routes/auth"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use('/api/users', users_1.default);
app.use('/api/videos', videos_1.default);
app.use('/api/comments', comments_1.default);
app.use('/api/auth', auth_1.default);
const errorHandler = (err, req, res, next) => {
    const status = (err === null || err === void 0 ? void 0 : err.status) || 500;
    const message = (err === null || err === void 0 ? void 0 : err.message) || 'Something went wrong';
    return res.status(status).json({
        status,
        message,
        success: false
    });
};
app.use(errorHandler);
const connect = () => {
    mongoose_1.default
        .connect(process.env.MONGO_DB)
        .then(() => {
        console.log('Connected To DB!');
    })
        .catch(err => console.log(err));
};
app.get('/', (req, res) => {
    console.log('Hi');
    res.send('Hi');
});
app.listen(3000, () => {
    console.log('Server Started Successfully!');
    connect();
});
//# sourceMappingURL=index.js.map