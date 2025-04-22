import mongoose from "mongoose";

import { Request, Response } from "express";

const { DocumentFactory, PostModel } = require('../models/models')

const getPosts = async (req: Request, res: Response) => {
    const posts = await PostModel.find({}).sort({ createdAt: -1 });

    res.status(200).json(posts);
}

const getPost = async (req: Request, res: Response) => {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: "Invalid ID Type" })
    }

    const post = await PostModel.findById(id);

    if (!post) {
        return res.status(404).json({error: "post is not found"})
    }

    res.status(200).json(post);
}

const createPost = async (req: Request, res: Response) => {
    const post = new PostModel(req.body)
    try {
        const savedPost = await post.save();
    } catch (error: any) {
        console.log("Something went wrong at post-controller.createPost: ", error);
        return res.status(400).json({error: error.message})
    }
    res.status(200).json(post)
}

const deletePost = async (req: Request,  res: Response) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "Wrong ID type"})
    }
    const post = PostModel.findById(id)
    await post.deleteOne()
    if (!post){
        return res.status(404).json({error: "Post wasn't found"})
    }
    res.status(200).json({msg: "Post was deleted successfully"})
}

module.exports = {
    getPosts,
    getPost,
    createPost,
    deletePost
}