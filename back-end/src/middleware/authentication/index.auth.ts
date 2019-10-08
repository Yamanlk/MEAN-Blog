import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken"
import { BaseError, ERRORS } from "shared"
import { Env } from "../../config/config"

export function jwtAuth(req: Request, res: Response, next: NextFunction) {

    if (!req.cookies.signature) {
        next();
    } else {
        const signature = req.cookies.signature;
        const userpayload = req.cookies.user;
        const userToken = [userpayload, signature].join(".");

        try {
            if (jwt.verify(userToken, Env.jwtSecret)) {
                req.cookies.user = jwt.decode(userToken);
                res.cookie("signature", signature, { maxAge: 60 * 60 * 1000, httpOnly: true, path: "/" });
                res.cookie("user", userpayload, { path: '/', maxAge: 60 * 60 * 1000 });
                next();
            } else {
                res.cookie("signature", "", { expires: new Date(Date.now()), httpOnly: true, path: "/" })
                res.cookie("user", "", { expires: new Date(Date.now()), path: "/" })
                let error: BaseError = { ...ERRORS.Unauthorized };
                next(error);
            }
        } catch (e) {
            res.cookie("signature", "", { expires: new Date(Date.now()), httpOnly: true, path: "/" })
            res.cookie("user", "", { expires: new Date(Date.now()), path: "/" })
            let error: BaseError = { ...ERRORS.Unauthorized };
            next(error);
        }
    }
}