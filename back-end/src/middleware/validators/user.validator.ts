import * as Joi from '@hapi/joi';
import { Request, Response, NextFunction } from "express"
import { UserValidator, ERRORS } from "shared"

export const userSchema = Joi.object().keys({
    "firstname": Joi.string().min(UserValidator.firstname.minLength).max(UserValidator.firstname.maxLength).regex(RegExp(UserValidator.firstname.onlyIncludeRegex)),
    "lastname": Joi.string().min(UserValidator.lastname.minLength).max(UserValidator.lastname.maxLength).regex(RegExp(UserValidator.lastname.onlyIncludeRegex)),
    "username": Joi.string().min(UserValidator.username.minLength).max(UserValidator.username.maxLength).regex(RegExp(UserValidator.username.onlyIncludeRegex)),
    "password": Joi.string().min(UserValidator.username.minLength).max(UserValidator.username.maxLength).regex(RegExp(UserValidator.username.onlyIncludeRegex))
})

export function validateUser(req: Request, res: Response, next: NextFunction): void {
    const result = Joi.validate(req.body.author, userSchema, { presence: "required" })
    if (result.error) {
        let error = ERRORS.InvalidData;
        error.info = {
            [result.error.name]: result.error.message
        };
        next(error);
    }
    else next();
};

export function validateUserUpdate(req: Request, res: Response, next: NextFunction) {
    const result = userSchema.validate(req.body, { presence: "optional" });
    if (result.error) {
        let error = ERRORS.InvalidData;
        error.info = {
            [result.error.name]: result.error.message
        };
        next(error);
    }
    else next()
};
