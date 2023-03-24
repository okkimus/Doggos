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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
dotenv_1.default.config();
const port = process.env.PORT;
var corsOptions = {
    origin: process.env.FRONTEND_URL,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
const app = (0, express_1.default)();
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.json());
app.get('/votes/:breed', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const vote = yield prisma.vote.findUnique({
        where: { breed: req.params.breed }
    });
    res.json({ breed: req.params.breed, count: ((vote === null || vote === void 0 ? void 0 : vote.upVotes) - (vote === null || vote === void 0 ? void 0 : vote.downVotes)) });
}));
app.post('/votes/:breed', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const breed = req.params.breed;
    const liked = req.body.like;
    // const existingVotes = await prisma.vote.findFirst({ where: { breed }})
    const vote = yield prisma.vote.upsert({
        where: { breed },
        update: {
            upVotes: { increment: liked ? 1 : 0 },
            downVotes: { increment: liked ? 0 : 1 },
        },
        create: { breed, upVotes: liked ? 1 : 0, downVotes: liked ? 0 : 1 },
    });
    yield prisma.$disconnect();
    res.json({ breed: breed, count: vote.upVotes - vote.downVotes });
}));
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
