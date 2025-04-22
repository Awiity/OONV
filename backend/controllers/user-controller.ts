import mongoose from "mongoose";

import { Request, Response } from "express";

const { DocumentFactory, UserModel } = require('../models/models')

const getUsers = async (req: Request, res: Response) => {
    const users = await UserModel.find({}).sort({ createdAt: -1 });

    res.status(200).json(users);
}

const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: "Invalid ID Type" })
    }

    const user = await UserModel.findById(id);

    if (!user) {
        return res.status(404).json({error: "user is not found"})
    }

    res.status(200).json(user);
}

const createUser = async (req: Request, res: Response) => {
    const user = new UserModel(req.body)
    try {
        const savedUser = await user.save();
    } catch (error: any) {
        console.log("Something went wrong at user-controller.createUser: ", error);
        return res.status(400).json({error: error.message})
    }
    res.status(200).json(user)
}

const deleteUser = async (req: Request,  res: Response) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "Wrong ID type"})
    }
    const user = UserModel.findById(id)
    await user.deleteOne()
    if (!user){
        return res.status(404).json({error: "User wasn't found"})
    }
    res.status(200).json({msg: "User was deleted successfully"})
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    deleteUser
}