import { Response, Request, NextFunction } from 'express';
import * as Joi from "@hapi/joi";
import { UserValidator, UnauthorizedError } from "shared"
import {userSchema} from "./user.validator"

const usernameLoginSchema = Joi.object({
    "username": Joi.string().min(UserValidator.username.minLength).max(UserValidator.username.maxLength).regex(RegExp(UserValidator.username.onlyIncludeRegex)).required(),
    "password": Joi.string().min(UserValidator.username.minLength).max(UserValidator.username.maxLength).regex(RegExp(UserValidator.username.onlyIncludeRegex)).required()
})

export function isAuthenticated(req: Request, res: Response, next: NextFunction): void {
    if (!req.cookies.user)
        next(new UnauthorizedError());
    else
        next();
};
export function validateUsernameLogin(req: Request, res: Response, next: NextFunction): void {
    if (req.cookies.user.id)
        next(new Error('already logedin'));
    else {
        usernameLoginSchema.validate(req.body, (err, res) => {
            if (err) next(err);
            else next();
        })
    }
};

export function validateUsernameSignup(req: Request, res: Response, next: NextFunction): void {
    if(req.cookies.user.id) next(new Error('logout first'));
    else {
        userSchema.validate(req.body, (err, res) => {
            if(err) next(err);
            else next(res);
        })
    }
}
