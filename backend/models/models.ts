import mongoose, {Document, Schema} from "mongoose";

interface IBaseDocument extends Document {
    createdAt: Date,
    updateAt: Date
}

interface IUserDocument extends IBaseDocument {
    username: string,
    email: string
}

interface IPostDocument extends IBaseDocument {
    title: string,
    body: string,
    author: string
}

const baseSchemaOptions = {
    timestamps: true,
    discriminatorKey: 'kind'
}

const baseSchema = new Schema({}, baseSchemaOptions)

const BaseModel = mongoose.model<IBaseDocument>('Base', baseSchema)

const userSchema = new Schema<IUserDocument>({
    username: {type: String, required: true},
    email: {type: String, required: true}
})

const postSchema = new Schema<IPostDocument>({
    title: {type: String, required: true},
    body: {type: String, required: false}
})

const UserModel = BaseModel.discriminator<IUserDocument>('User', userSchema);
const PostModel = BaseModel.discriminator<IPostDocument>('Post', postSchema);

class DocumentFactory{
    static create<T extends IBaseDocument>(type: string, data: Partial<T>): T {
        switch (type.toLowerCase()) {
            case 'user':
                return new UserModel(data) as T;
            case 'post':
                return new PostModel(data) as T;
            default:
                throw new Error(`Invalid document type: ${type}`);
        }
    }
}

module.exports = {
    DocumentFactory,
    PostModel,
    UserModel
}