interface Info {
    [infoKey: string]: string | any
}

export interface BaseError {
    message: string;
    status: number;
    info?: Info;
}

export const ERRORS: {[errorName: string]: BaseError} = {
    BadRequest: {message: "Bad request please try again", status: 400},
    Unauthorized: {message: "Unauthenticated please signin", status: 401},
    Forbidden: {message: "Unauthorized to use this service", status: 403},
    NotFound: {message: "Page was not found", status: 404},
    InvalidData: {message: "Invalid Data", status: 422}
}