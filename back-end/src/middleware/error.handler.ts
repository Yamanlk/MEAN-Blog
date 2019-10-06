import { Request, Response, NextFunction } from 'express'
import { BaseError, ERRORS } from "shared"
export default function (error: BaseError, req: Request, res: Response, next: NextFunction) {
    if (error) {
        if (error.status >= 500) {
            res.status(500);
            res.end();
        } else {
            res.status(error.status);
            res.send(error);
        }
    }
    else {
        res.status(ERRORS.NotFound.status);
        res.send(ERRORS.NotFound);
    }
};
