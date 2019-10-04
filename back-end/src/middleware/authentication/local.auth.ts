import { User } from '../../models/user.model';
import * as jwt from "jsonwebtoken"
import * as cookie from "cookie"
import { Env } from "../../config/config"
import { Response, Request, NextFunction } from "express"
import { InvalidDataError } from 'shared';

export function login(req: Request, res: Response, next: NextFunction): void {
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({ username: username, password: password })
        .then((doc) => {
            if (!doc)
                next(new InvalidDataError({
                    username: "username and password doesn't match",
                    password: "username and password doesn't match"
                }));
            else {
                const user = {
                    id: doc.id,
                    firstname: doc.firstname,
                    lastname: doc.lastname
                }
                const idJwt = jwt.sign(user, Env.jwtSecret);
                res.setHeader('Set-Cookie', cookie.serialize('user', idJwt, { path: '/' }));
                res.setHeader('Content-Type', 'application/json');
                res.json({
                    "id": doc.id,
                    "firstname": doc.firstname,
                    "lastname": doc.lastname
                });
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
                id: doc.id,
                firstname: doc.firstname,
                lastname: doc.lastname
            }
            const idJwt = jwt.sign(user, Env.jwtSecret);
            res.setHeader('Set-Cookie', cookie.serialize('user', idJwt, { path: '/' }));
            res.setHeader('Content-Type', 'application/json');
            res.json(user);
        })
        .catch(next)
}
