import { ISArticle } from "./article-data.interface";

export interface ISUser {
    "id"?: any;
    "firstname"?: string;
    "lastname"?: string;
    "articles"?: ISArticle[] | any;
    "username"?: string;
    "password"?: string;
}