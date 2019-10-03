import { ValidationSchema } from "./validationSchema";

interface UserValidator {
    firstname: ValidationSchema;
    lastname: ValidationSchema;
    username: ValidationSchema;
    password: ValidationSchema;
}

export const UserValidator : UserValidator = {
    "firstname": {
        "minLength": 2,
        "maxLength": 8,
        "required": true,
        "onlyIncludeRegex": "^[a-zA-Z0-9]*$"
    },
    "lastname": {
        "minLength": 2,
        "maxLength": 8,
        "required": true,
        "onlyIncludeRegex": "^[a-zA-Z0-9]*$"
    },
    "username": {
        "minLength": 4,
        "maxLength": 10,
        "required": true,
        "onlyIncludeRegex": "^[a-zA-Z0-9]*$",
    },
    "password": {
        "minLength": 6,
        "maxLength": 20,
        "required": true,
        "onlyIncludeRegex": "^[a-zA-Z0-9!@#$%^&*.]*$"
    }
}