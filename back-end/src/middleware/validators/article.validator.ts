import * as Joi from "@hapi/joi"
import { Response, Request, NextFunction } from "express"
import { ERRORS } from "shared";

import { Categories as validCategories } from "shared"

const Schema = Joi.object({
    title: Joi.string().min(2).max(30),
    content: Joi.string().min(1).max(1000),
    categories: Joi.array().items(Joi.string().valid(validCategories)),
});

export function validate(req: Request, res: Response, next: NextFunction): void {
    const result = Schema.validate(req.body, { presence: "required" });
    if (result.error) {
        let error = ERRORS.InvalidData;
        error.info = {
            [result.error.name]: result.error.message
        };
        next(error);
    }
    else next();
};

export function validateUpdate(req: Request, res: Response, next: NextFunction): void {
    const result = Schema.validate(req.body);
    if (result.error) {
        let error = ERRORS.InvalidData;
        error.info = {
            [result.error.name]: result.error.message
        };
        next(error);
    }
    else next();
};

export function validateCategories(req: Request, res: Response, next: NextFunction): void {
    if (req.query.cat == undefined){
        let error = ERRORS.InvalidData;
        error.info = {
            categories: "Categories are not provided"
        };
        next(error);
    }
    else
        next();
};
