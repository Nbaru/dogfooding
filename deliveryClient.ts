import {DeliveryClient, TypeResolver, IContentItem} from "@kentico/kontent-delivery";
import {Article} from "./article";

export const deliveryClient = new DeliveryClient({
    projectId: process.env.projectId ?? '',
    typeResolvers: [
        new TypeResolver('article', (rawData) => new Article())
    ]
});