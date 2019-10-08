import { User } from "../models/user.model"
import { Request, Response, NextFunction } from "express"
import { validateObjcetId } from "../middleware/validators/index.validator"

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
