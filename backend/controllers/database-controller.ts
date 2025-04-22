//SINGLE-TON IMPLEMENTATION

import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";

dotenv.config();


class MongoDBClient {
    private static instance: MongoDBClient;
    private connectionPromise: Promise<typeof mongoose> | null = null;
    private constructor() {};

    public static getInstance(): MongoDBClient {
        if (!MongoDBClient.instance) {
            MongoDBClient.instance = new MongoDBClient;
        }
        return MongoDBClient.instance;
    }

    public async connect(uri: string, options?: mongoose.ConnectOptions): Promise<typeof mongoose> {
        if (mongoose.connection.readyState === 1) {
            console.log("Coonect has already been established.");
            return mongoose;
        }
        if (!this.connectionPromise) {
            this.connectionPromise = mongoose.connect(uri, { ...options,
                                                             serverSelectionTimeoutMS: 5000 })
                .then((mongooseInstance) => {
                    console.log("Connecton has been established successfully!");
                    return mongooseInstance;
                })
                .catch((error) => {
                    console.log("MongoDB connection failed: ", error);
                    this.connectionPromise = null;
                    throw error;
                })
        }
        return this.connectionPromise;
    }

    public async disconnect() : Promise<void> {
        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
            console.log('MongoDB connection has been successfully disconnected');
        }
    }

}

const MONGO_URI: string = process.env.MONGO_URI!; // ! - is to tell TS to trust us that in fact mongo_uri is string and not undifned


export const mongoDBClient = MongoDBClient.getInstance();
export const connectToMongoDB = () => mongoDBClient.connect(MONGO_URI)