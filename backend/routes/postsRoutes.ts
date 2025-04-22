import { create } from "domain";
import express from "express";
const {
    getPosts,
    getPost,
    createPost,
    deletePost
} = require("../controllers/post-controller")

const router = express.Router();

router.get('/', getPosts)

router.get('/:id', getPost)

router.delete('/:id', deletePost)

router.post('/', createPost)

module.exports = router