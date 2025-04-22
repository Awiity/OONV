import { error } from "console";
import mongoose from "mongoose";
import dotenv from "dotenv";
import express, { NextFunction, type Express, Request, Response } from "express";
import { connectToMongoDB } from "./controllers/database-controller";
import { start } from "repl";

const cors = require("cors")

dotenv.config();
const app = express();
const postsRoutes = require('./routes/postsRoutes')
const usersRoutes = require('./routes/userRoutes')

app.use(express.json())
app.use(cors())
app.get("/", (req: Request, res: Response, next: NextFunction): void => {
    try {
        res.send("Hiiii");
    } catch {
        next(error);
    }
});

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use("/api/posts", postsRoutes)
app.use("/api/users", usersRoutes)

app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(req.path, req.method);
    next();
})

const port = process.env.PORT;
const mongo_uri = process.env.MONGO_URI;
async function startApp(){
    try {
        await connectToMongoDB();
        app.listen(port, () => console.log(`DB connection successful, listening to port: ${port}`))
    } catch (error) {
        console.log("Failed connection to DB: ", error);
        process.exit(1);
    }
}

startApp();