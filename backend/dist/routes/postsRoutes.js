"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { getPosts, getPost, createPost, deletePost } = require("../controllers/post-controller");
const router = express_1.default.Router();
router.get('/', getPosts);
router.get('/:id', getPost);
router.delete('/:id', deletePost);
router.post('/', createPost);
module.exports = router;
