import {ValidationSchema} from "./validationSchema"

interface ArticleValidation {
    title: ValidationSchema,
    content: ValidationSchema,
}

export const ArticleValidatior: ArticleValidation = {
    title: {
        maxLength: 20,
        minLength: 5,
        required: true,
        onlyIncludeRegex: ""
    },
    content: {
        maxLength: 1000,
        minLength: 100,
        required: true,
        onlyIncludeRegex: ""
    },
}