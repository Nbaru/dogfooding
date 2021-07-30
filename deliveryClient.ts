import {DeliveryClient, TypeResolver } from "@kentico/kontent-delivery";
import {Article} from "./models/article";
import {Author} from "./models/author";

export const deliveryClient = new DeliveryClient({
    projectId: process.env.projectId ?? '',
    typeResolvers: [
        new TypeResolver('article', (rawData) => new Article()),
        new TypeResolver('author', () => new Author())
    ]
});