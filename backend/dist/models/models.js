"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const baseSchemaOptions = {
    timestamps: true,
    discriminatorKey: 'kind'
};
const baseSchema = new mongoose_1.Schema({}, baseSchemaOptions);
const BaseModel = mongoose_1.default.model('Base', baseSchema);
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true }
});
const postSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    body: { type: String, required: false }
});
const UserModel = BaseModel.discriminator('User', userSchema);
const PostModel = BaseModel.discriminator('Post', postSchema);
class DocumentFactory {
    static create(type, data) {
        switch (type.toLowerCase()) {
            case 'user':
                return new UserModel(data);
            case 'post':
                return new PostModel(data);
            default:
                throw new Error(`Invalid document type: ${type}`);
        }
    }
}
module.exports = {
    DocumentFactory,
    PostModel,
    UserModel
};
