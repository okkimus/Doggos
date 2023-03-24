"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
const port = process.env.PORT;
var corsOptions = {
    origin: process.env.FRONTEND_URL,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
const app = (0, express_1.default)();
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.json());
const votes = new Map();
app.get('/votes/:breed', (req, res) => {
    var _a;
    const count = (_a = votes.get(req.params.breed)) !== null && _a !== void 0 ? _a : 0;
    res.json({ breed: req.params.breed, count });
});
app.post('/votes/:breed', (req, res) => {
    var _a;
    const breed = req.params.breed;
    console.log(req.body);
    const delta = req.body.like ? 1 : -1;
    const count = ((_a = votes.get(breed)) !== null && _a !== void 0 ? _a : 0) + delta;
    votes.set(breed, count);
    res.json({ breed: breed, count });
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
