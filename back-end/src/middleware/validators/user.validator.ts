import * as Joi from '@hapi/joi';
import { Request, Response, NextFunction } from "express"
import { UserValidator, InvalidDataError } from "shared"

export const userSchema = Joi.object().keys({
    "firstname": Joi.string().min(UserValidator.firstname.minLength).max(UserValidator.firstname.maxLength).regex(RegExp(UserValidator.firstname.onlyIncludeRegex)),
    "lastname": Joi.string().min(UserValidator.lastname.minLength).max(UserValidator.lastname.maxLength).regex(RegExp(UserValidator.lastname.onlyIncludeRegex)),
    "username": Joi.string().min(UserValidator.username.minLength).max(UserValidator.username.maxLength).regex(RegExp(UserValidator.username.onlyIncludeRegex)),
    "password": Joi.string().min(UserValidator.username.minLength).max(UserValidator.username.maxLength).regex(RegExp(UserValidator.username.onlyIncludeRegex))
})

export function validateUser(req: Request, res: Response, next: NextFunction): void {
    const result = Joi.validate(req.body.author, userSchema, { presence: "required" })
    if (result.error) next(new InvalidDataError({
        [result.error.name]: result.error.message
    }));
    else next();
};

export function validateAuthorUpdate(req: Request, res: Response, next: NextFunction) {
    const result = userSchema.validate(req.body, { presence: "optional" });
    if (result.error) next(new InvalidDataError({
        [result.error.name]: result.error.message
    }));
    else next()
};
