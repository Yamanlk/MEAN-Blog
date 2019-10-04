import * as Joi from "@hapi/joi"
import { Response, Request, NextFunction } from "express"
import { InvalidDataError } from "shared";

const validCategories = ['React', 'Node', 'Mognodb', 'Express', 'Angular']; // require the validCategories from some config folder

const Schema = Joi.object({
    title: Joi.string().min(2).max(30),
    content: Joi.string().min(1).max(1000),
    categories: Joi.array().items(Joi.string().valid(validCategories)),
});

export function validate(req: Request, res: Response, next: NextFunction): void {
    const result = Schema.validate(req.body, { presence: "required" });
    if (result.error) next(new InvalidDataError({
        [result.error.name]: result.error.message
    }));
    else next();
};

export function validateUpdate(req: Request, res: Response, next: NextFunction): void {
    const result = Schema.validate(req.body);
    if (result.error) next(new InvalidDataError({
        [result.error.name]: result.error.message
    }));
    else next();
};

export function validateCategories(req: Request, res: Response, next: NextFunction): void {
    if (req.query.cat == undefined)
        return next(new InvalidDataError({
            categories: "categories are not provided"
        }));
    else
        next();
};
