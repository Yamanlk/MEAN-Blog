import {Request, Response, NextFunction} from "express"
import { ERRORS } from "shared";

const objcetIdRegex = /^[a-f\d]{24}$/;

export function validateObjcetId (req: Request, res: Response, next: NextFunction): void {
    if (!objcetIdRegex.test(req.params.id)) {
        let error = ERRORS.InvalidData;
        error.info = {
            objectId: "Invalid id"
        };
        next(error);
    }
    else
        next();
};