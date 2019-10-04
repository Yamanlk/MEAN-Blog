import * as mongoose from 'mongoose';
import { ISUser, UserValidator, InvalidDataError, NotFoundError } from 'shared'
import { IDocumentArticle } from './article.model';

export interface IDocumentUser extends ISUser, mongoose.Document {
    s: IDocumentArticle[] | mongoose.Types.ObjectId;
    isLiked(Id: string): boolean;
}

export interface IModelUser extends mongoose.Model<IDocumentUser> {
    creatUser(user: ISUser): Promise<IDocumentUser>;
    findUserById(userId: string): Promise<IDocumentUser>;
    findUserByUsername(username: string): Promise<IDocumentUser>;
}

const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true, max: UserValidator.firstname.maxLength, min: UserValidator.firstname.minLength, match: RegExp(UserValidator.firstname.onlyIncludeRegex) },
    lastname: { type: String, required: true, max: UserValidator.lastname.maxLength, min: UserValidator.lastname.minLength, match: RegExp(UserValidator.lastname.onlyIncludeRegex) },
    articles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Atricle' }],
    username: { type: String, required: true, min: UserValidator.username.minLength, max: UserValidator.username.maxLength, match: RegExp(UserValidator.username.onlyIncludeRegex) },
    password: { type: String, required: true, min: UserValidator.password.maxLength, max: UserValidator.password.maxLength, match: RegExp(UserValidator.password.onlyIncludeRegex) }
});

//statics
userSchema.statics.creatUser = function (user: ISUser): Promise<IDocumentUser> {
    return new Promise((resolve, reject) => {
        User.findOne({ username: user.username })
            .then((doc) => {
                if (doc)
                    reject(new InvalidDataError({
                        username: "username is already taken"
                    }));
                else {
                    User.create(user)
                        .then(resolve)
                        .catch(reject);
                }
            })
            .catch(reject);
    });
};
userSchema.statics.findUserById = function (userId: string): Promise<IDocumentUser> {
    return new Promise((resolve, reject) => {
        User.findById(userId)
            .then((doc) => {
                if(!doc) reject(new NotFoundError());
                else resolve(doc);
            })
            .catch(reject);
    });
};
userSchema.statics.findUserByUsername = function (username: string): Promise<IDocumentUser> {
    return new Promise((resolve, reject) => {
        User.findOne({ username: username })
            .then((doc) => {
                if(!doc) reject(new NotFoundError());
                else resolve(doc);
            })
            .catch(reject);
    });
};
//methods
userSchema.methods.isLiked = function (Id: string): boolean {
    return this.model("User").liked_s.includes(mongoose.Types.ObjectId(Id));
}
export const User = mongoose.model<IDocumentUser, IModelUser>('User', userSchema);