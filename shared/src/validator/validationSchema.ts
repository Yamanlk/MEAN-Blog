export interface ValidationSchema {
    "minLength": number;
    "maxLength": number;
    "required": boolean;
    "onlyIncludeRegex"?: string;
}