interface ExtraInfo {
    [infoKey: string]: string
}

export class BaseError extends Error {
    extraInfo: ExtraInfo;
    status: number;
    constructor(extraInfo?: ExtraInfo) {
        super();
        this.extraInfo = extraInfo
    }
}

export class NotFoundError extends BaseError {
    constructor(extraInfo?: ExtraInfo) {
        super(extraInfo);
        this.name = "NotFound";
        this.message = "Page was not found";
        this.status = ErrorStatus.NotFound;
    }
}

export class InvalidDataError extends BaseError {
    constructor(extraInfo?: ExtraInfo) {
        super(extraInfo);
        this.name = "InvalidData";
        this.message = "Data sent were invalid";
        this.status = ErrorStatus.InvalidData;
    }
}

export class UnauthorizedError extends BaseError {
    constructor(extraInfo?: ExtraInfo) {
        super(extraInfo);
        this.name = "Unauthorized";
        this.message = "Please signin to your account or creat one";
        this.status = ErrorStatus.Unauthorized;
    }
}

export class ForbiddenError extends BaseError {
    constructor(extraInfo?: ExtraInfo) {
        super(extraInfo);
        this.name = "Forbidden";
        this.message = "You don't have access";
        this.status = ErrorStatus.Forbidden;
    }
}

export class NoInternetConnectionError extends BaseError {
    constructor() {
        super();
        this.status = ErrorStatus.NoInternetConnection;
        this.name = "NoInternetConnection";
        this.message = "No internet connection";
    }
}

export enum ErrorStatus {
    NoInternetConnection= 420,
    BadRequest= 400,
    Unauthorized= 401,
    Forbidden= 403,
    NotFound= 404,
    InvalidData= 422,
}