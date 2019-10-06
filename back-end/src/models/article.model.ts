import * as mongoose from "mongoose"
import { ISArticle, ERRORS } from "shared"
import { IDocumentUser, User } from "./user.model"

export interface IDocumentArticle extends mongoose.Document, ISArticle {
    userId: IDocumentUser | mongoose.Types.ObjectId;
}

export interface IModelArticle extends mongoose.Model<IDocumentArticle> {
    findByCategory(categoriesList: String[]): Promise<IDocumentArticle>;
    findByUser(userId: string): Promise<IDocumentArticle[]>;
    findArticleById(articleId:string): Promise<IDocumentArticle>;
    creatArticle(userId: string, article: ISArticle): Promise<IDocumentArticle>;
    updateArticle(userId: string, newArticle: ISArticle): Promise<IDocumentArticle>;
    deleteArticle(userId: string, articleId: string): Promise<{ ok?: number, n?: number, deletedCound?: number }>;
    getArticles(from: number, count: number): Promise<IDocumentArticle[]>;
}

const articleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    categories: [{ type: String }],
    date: { type: Date, default: Date.now }
})

//Statics
articleSchema.statics.findByCategory = function (categoriesList: string[]): Promise<IDocumentArticle[]> {
    return new Promise((resolve, reject) => {
        Article.find({}).
            where('categories').in(categoriesList).
            sort('title').
            exec((err, docs) => {
                if (err)
                    reject(err);
                else if(docs.length === 0) reject(ERRORS.NotFound);
                else resolve(docs);
            });
    });
};
articleSchema.statics.findByUser = function (userId: string): Promise<IDocumentArticle[]> {
    return new Promise((resolve, reject) => {
        Article.find({ userId: userId })
            .then((doc) => {
                if(!doc) reject(ERRORS.NotFound);
                else resolve(doc);
            })
            .catch(reject);
    });
};
articleSchema.statics.creatArticle = function (userID: string, article: ISArticle): Promise<IDocumentArticle> {
    return new Promise((resolve, reject) => {
        article.userId = mongoose.Types.ObjectId(userID);
        Article.create(article)
            .then(resolve)
            .catch(reject);
    });
};
articleSchema.statics.updateArticle = function (userId: string, newArticle: ISArticle): Promise<IDocumentArticle> {
    return new Promise((resolve, reject) => {
        Article.findById(newArticle._id)
            .then((doc) => {
                if (!doc)
                    reject(ERRORS.NotFound);
                else if ((<mongoose.Types.ObjectId>doc.userId).toHexString() !== userId)
                    reject(ERRORS.Unauthorized);
                else {
                    Object.assign(doc, newArticle);
                    doc.save()
                        .then(resolve)
                        .catch(reject);
                }
            })
            .catch(reject);
    });
};
articleSchema.statics.deleteArticle = function (userId: string, articleId: string): Promise<{ ok?: number, n?: number, deletedCount?: number }> {
    return new Promise((resolve, reject) => {
        Article.findById(articleId)
            .populate('userID')
            .then((doc) => {
                if (!doc) reject(ERRORS.NotFound)
                else if ((<IDocumentUser>doc.userId).toString() !== userId)
                    reject(ERRORS.Forbidden);
                else {
                    Article.deleteOne(doc).exec().then(resolve).catch(reject);
                }
            })
            .catch(reject);
    });
};
articleSchema.statics.findArticleById = function (articleId: string): Promise<IDocumentArticle> {
    return new Promise((resolve, reject) => {
        Article.findById(articleId)
        .populate("userId", ["firstname", "lastname"])
            .then(doc => {
                if(!doc) reject(ERRORS.NotFound);
                else resolve(doc);
            })
            .catch(reject);
    });
};
articleSchema.statics.getArticles = function (from: number, count: number): Promise<IDocumentArticle[]> {
    return new Promise<IDocumentArticle[]>((resolve, reject) => {
        Article.find()
            .skip(from)
            .limit(count)
            .exec((err, docs) => {
                if (err) reject(err)
                else resolve(docs);
            })
    })
}
export const Article = mongoose.model<IDocumentArticle, IModelArticle>('Article', articleSchema);
