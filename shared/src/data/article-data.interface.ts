export interface ISArticle {
    _id: any;
    title?: string;
    userId?: any;
    content?: string;
    categories?: string[];
}

export const Categories = [
    "Node js",
    "Angular",
    "React",
    "MongoDB",
    "Mongoose",
]