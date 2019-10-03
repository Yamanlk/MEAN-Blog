import { ISArticle } from "./blog-data.interface";

export interface ISUser {
    "id"?: any;
    "firstname"?: string;
    "lastname"?: string;
    "blogs"?: ISArticle[] | any;
    "liked_blogs"?: ISArticle[] | any ,
    "username"?: string;
    "password"?: string;
}