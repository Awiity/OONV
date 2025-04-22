"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const console_1 = require("console");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get("/", (req, res, next) => {
    try {
        res.send("Hiiii");
    }
    catch (_a) {
        next(console_1.error);
    }
});
app.listen(4000, () => {
    console.log("server is running");
});
