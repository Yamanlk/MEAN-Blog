import { User } from '../../models/user.model';
import * as jwt from "jsonwebtoken"
import * as cookie from "cookie"
import { Env } from "../../config/config"
import { Response, Request, NextFunction } from "express"
import { ERRORS } from 'shared';

export function login(req: Request, res: Response, next: NextFunction): void {
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({ username: username, password: password })
        .then((doc) => {
            if (!doc) {
                let error = ERRORS.InvalidData;
                error.info = {
                    username: "username and password doesn't match",
                    password: "username and password doesn't match"
                }
                next(error);
            }
            else {
                const user = {
                    id: doc._id,
                    firstname: doc.firstname,
                    lastname: doc.lastname
                }

                const userToken = jwt.sign(user, Env.jwtSecret).split(".");
                const signature = userToken[2];
                const headerAndPayload = [userToken[0], userToken[1]].join('.');

                res.cookie("signature", signature, { httpOnly: true, maxAge: 60 * 60 * 1000, path: "/" });
                res.cookie("user", headerAndPayload, { path: '/', maxAge: 60 * 60 * 1000 });
                res.status(200);
                res.end();
            }
        })
        .catch(next);
};

export function signUp(req: Request, res: Response, next: NextFunction): void {
    const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password
    }
    User.creatUser(user)
        .then(doc => {
            const user = {
                id: doc._id,
                firstname: doc.firstname,
                lastname: doc.lastname
            }

            const userToken = jwt.sign(user, Env.jwtSecret).split(".");
            const signature = userToken[2];
            const headerAndPayload = [userToken[0], userToken[1]].join('.');

            res.cookie("signature", signature, { httpOnly: true, maxAge: 60 * 60 * 1000, path: "/" });
            res.cookie("user", headerAndPayload, { path: '/', maxAge: 60 * 60 * 1000 });
            res.status(201);
            res.end();
        })
        .catch(next)
}

export function logout(req: Request, res: Response, next: NextFunction) {
    res.cookie("signature", "", {path: "/", httpOnly: true, expires: new Date(Date.now())});
    res.cookie("user", "", {path: "/", expires: new Date(Date.now())})
    res.status(200);
    res.end();
}
