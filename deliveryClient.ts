import {DeliveryClient, TypeResolver, IContentItem} from "@kentico/kontent-delivery";
import {Article} from "./article";
import {Author} from "./author";

export const deliveryClient = new DeliveryClient({
    projectId: process.env.projectId ?? '',
    typeResolvers: [
        new TypeResolver('article', (rawData) => new Article()),
        new TypeResolver('author', () => new Author())
    ]
});