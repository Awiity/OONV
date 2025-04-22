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
exports.connectToMongoDB = exports.mongoDBClient = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class MongoDBClient {
    constructor() {
        this.connectionPromise = null;
    }
    ;
    static getInstance() {
        if (!MongoDBClient.instance) {
            MongoDBClient.instance = new MongoDBClient;
        }
        return MongoDBClient.instance;
    }
    connect(uri, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (mongoose_1.default.connection.readyState === 1) {
                console.log("Coonect has already been established.");
                return mongoose_1.default;
            }
            if (!this.connectionPromise) {
                this.connectionPromise = mongoose_1.default.connect(uri, Object.assign(Object.assign({}, options), { serverSelectionTimeoutMS: 5000 }))
                    .then((mongooseInstance) => {
                    console.log("Connecton has been established successfully!");
                    return mongooseInstance;
                })
                    .catch((error) => {
                    console.log("MongoDB connection failed: ", error);
                    this.connectionPromise = null;
                    throw error;
                });
            }
            return this.connectionPromise;
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (mongoose_1.default.connection.readyState !== 0) {
                yield mongoose_1.default.disconnect();
                console.log('MongoDB connection has been successfully disconnected');
            }
        });
    }
}
const MONGO_URI = process.env.MONGO_URI; // ! - is to tell TS to trust us that in fact mongo_uri is string and not undifned
exports.mongoDBClient = MongoDBClient.getInstance();
const connectToMongoDB = () => exports.mongoDBClient.connect(MONGO_URI);
exports.connectToMongoDB = connectToMongoDB;
