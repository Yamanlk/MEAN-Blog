import { Request, Response, NextFunction } from 'express'
import { NotFoundError, BaseError } from "shared"
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
        error = new NotFoundError();
        res.status(error.status);
        res.send(error);
    }
};
