import {DeliveryClient, TypeResolver, IContentItem} from "@kentico/kontent-delivery";
import {Article} from "./article";

export const deliveryClient = new DeliveryClient({
    projectId: '10c3010e-a97b-01fa-5f30-b67cbddce1fe',
    typeResolvers: [
        new TypeResolver('article', (rawData) => new Article())
    ]
});