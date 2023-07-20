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
const path_1 = __importDefault(require("path"));
const connect_history_api_fallback_1 = __importDefault(require("connect-history-api-fallback"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// process.env.MODE &&
//   app.use(
//     cors({
//       origin: '*'
//     })
//   )
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
app.use((0, connect_history_api_fallback_1.default)());
app.use(errorHandler);
// console.log(__dirname)
app.use('/', express_1.default.static(path_1.default.join(__dirname, '..', 'public')));
// app.use('/', express.static(path.join(__dirname, '..', 'public', 'assets')))
const connect = () => {
    mongoose_1.default
        .connect(process.env.MONGO_DB)
        .then(() => {
        console.log('Connected To DB!');
    })
        .catch(err => console.log(err));
};
app.get('/', (req, res) => {
    res.sendFile('/index.html');
});
// app.use('*',  (req: Request, res: Response) => {
//   console.log('Invalid Route')
//   res.status(404).send('Invalid Route!')
// })
app.listen(process.env.PORT || 3000, () => {
    console.log('Server Started Successfully on: ' + process.env.PORT);
    connect();
});
