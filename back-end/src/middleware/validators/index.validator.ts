import {Request, Response, NextFunction} from "express"
import { InvalidDataError } from "shared";

const objcetIdRegex = /^[a-f\d]{24}$/;

export function validateObjcetId (req: Request, res: Response, next: NextFunction): void {
    if (!objcetIdRegex.test(req.params.id))
        next(new InvalidDataError({
            objectId: "invalid id"
        }));
    else
        next();
};