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
const console_1 = require("console");
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const database_controller_1 = require("./controllers/database-controller");
const cors = require("cors");
dotenv_1.default.config();
const app = (0, express_1.default)();
const postsRoutes = require('./routes/postsRoutes');
const usersRoutes = require('./routes/userRoutes');
app.use(express_1.default.json());
app.use(cors());
app.get("/", (req, res, next) => {
    try {
        res.send("Hiiii");
    }
    catch (_a) {
        next(console_1.error);
    }
});
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use("/api/posts", postsRoutes);
app.use("/api/users", usersRoutes);
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});
const port = process.env.PORT;
const mongo_uri = process.env.MONGO_URI;
function startApp() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, database_controller_1.connectToMongoDB)();
            app.listen(port, () => console.log(`DB connection successful, listening to port: ${port}`));
        }
        catch (error) {
            console.log("Failed connection to DB: ", error);
            process.exit(1);
        }
    });
}
startApp();
