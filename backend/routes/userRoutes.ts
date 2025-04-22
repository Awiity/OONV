import { create } from "domain";
import express from "express";
const {
    getUsers,
    getUser,
    createUser,
    deleteUser
} = require('../controllers/user-controller')

const router = express.Router();

router.get("/", getUsers)
router.get("/:id", getUser)
router.post("/", createUser)
router.delete("/:id", deleteUser)

module.exports = router;
