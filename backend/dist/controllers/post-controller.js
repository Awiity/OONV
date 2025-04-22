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
const { DocumentFactory, PostModel } = require('../models/models');
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield PostModel.find({}).sort({ createdAt: -1 });
    res.status(200).json(posts);
});
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid ID Type" });
    }
    const post = yield PostModel.findById(id);
    if (!post) {
        return res.status(404).json({ error: "post is not found" });
    }
    res.status(200).json(post);
});
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = new PostModel(req.body);
    try {
        const savedPost = yield post.save();
    }
    catch (error) {
        console.log("Something went wrong at post-controller.createPost: ", error);
        return res.status(400).json({ error: error.message });
    }
    res.status(200).json(post);
});
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Wrong ID type" });
    }
    const post = PostModel.findById(id);
    yield post.deleteOne();
    if (!post) {
        return res.status(404).json({ error: "Post wasn't found" });
    }
    res.status(200).json({ msg: "Post was deleted successfully" });
});
module.exports = {
    getPosts,
    getPost,
    createPost,
    deletePost
};
