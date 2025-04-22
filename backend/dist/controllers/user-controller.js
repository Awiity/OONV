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
const mongoose_1 = __importDefault(require("mongoose"));
const { DocumentFactory, UserModel } = require('../models/models');
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield UserModel.find({}).sort({ createdAt: -1 });
    res.status(200).json(users);
});
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid ID Type" });
    }
    const user = yield UserModel.findById(id);
    if (!user) {
        return res.status(404).json({ error: "user is not found" });
    }
    res.status(200).json(user);
});
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new UserModel(req.body);
    try {
        const savedUser = yield user.save();
    }
    catch (error) {
        console.log("Something went wrong at user-controller.createUser: ", error);
        return res.status(400).json({ error: error.message });
    }
    res.status(200).json(user);
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Wrong ID type" });
    }
    const user = UserModel.findById(id);
    yield user.deleteOne();
    if (!user) {
        return res.status(404).json({ error: "User wasn't found" });
    }
    res.status(200).json({ msg: "User was deleted successfully" });
});
module.exports = {
    getUsers,
    getUser,
    createUser,
    deleteUser
};
