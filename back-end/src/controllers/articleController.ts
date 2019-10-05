import { Request, Response, NextFunction } from "express"

import { Article } from "../models/article.model"
import { validate, validateUpdate, validateCategories } from "../middleware/validators/article.validator"
import { isAuthenticated } from "../middleware/validators/auth.validator"
import { validateObjcetId } from "../middleware/validators/index.validator"
import { InvalidDataError, NotFoundError } from "shared"

export const creatArticle = [
    isAuthenticated,
    validate,
    function (req: Request, res: Response, next: NextFunction) {
        Article.creatArticle(req.cookies.user.id, req.body)
            .then((doc) => {
                res.status(201);
                res.json({id: doc.id});
            })
            .catch(next);
    }
];
export const findArticleById = [
    validateObjcetId,
    function (req: Request, res: Response, next: NextFunction) {
        Article.findById(req.params.id)
            .then((doc) => {
                if (!doc) {
                    next(new NotFoundError());
                } else {
                    res.send(doc);
                }
            })
            .catch(next);
    }
];
export const deleteAtricle = [
    isAuthenticated,
    function (req: Request, res: Response, next: NextFunction) {
        Article.deleteArticle(req.cookies.user.id, req.params.id)
            .then((result) => {
                res.send(result);
            })
            .catch(next);
    }
];
export const updateAtricle = [
    isAuthenticated,
    validateUpdate,
    function (req: Request, res: Response, next: NextFunction) {
        Article.updateArticle(req.cookies.user.id, req.body)
            .then((doc) => {
                res.send(doc);
            })
            .catch(next);
    }
];
export const findArticleByUser = [
    validateObjcetId,
    function (req: Request, res: Response, next: NextFunction) {
        Article.findByUser(req.params.id)
            .then((doc) => {
                res.send(doc);
            })
            .catch(next);
    }
];
export const findArticleByCategories = [
    validateCategories,
    function (req: Request, res: Response, next: NextFunction) {
        const categoriesList = req.query.cat.split(' ');
        Article.findByCategory(categoriesList)
            .then((doc) => {
                res.send(doc);
            })
            .catch(next);
    }
];

export const getAtricles = [
    function (req: Request, res: Response, next: NextFunction) {
        const from = Number.parseInt(req.query.from);
        const count = Number.parseInt(req.query.count);
        if (from < 0 || count <= 0 || isNaN(from) || isNaN(count)) {
            next(new InvalidDataError({
                data: "data was not provided correctly"
            }));
        }
        else {
            Article.getArticles(from, count)
                .then(docs => res.json(docs))
                .catch(next)
        }
    }
]
