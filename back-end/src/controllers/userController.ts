import { User } from "../models/user.model"
import { validateUser } from "../middleware/validators/user.validator"
import { Request, Response, NextFunction } from "express"
import { validateObjcetId } from "../middleware/validators/index.validator"

export const creatUser = [
    validateUser,
    function (req: Request, res: Response, next: NextFunction) {
        User.creatUser(req.body)
            .then((doc) => {
                res.send(`an author with the id ${doc._id} was created`);
            })
            .catch(next);
    }
];

export const findUserById = [
    validateObjcetId,
    function (req: Request, res: Response, next: NextFunction) {
        User.findUserById(req.params.id)
            .then((doc) => {
                res.send(doc);
            })
            .catch(next);
    }
];
