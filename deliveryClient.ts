import {DeliveryClient, TypeResolver } from "@kentico/kontent-delivery";
import {Post} from "./models/post";
import {Author} from "./models/author";
import {ItemTypes} from "./constants";

export const deliveryClient = new DeliveryClient({
    projectId: process.env.projectId ?? '',
    typeResolvers: [
        new TypeResolver(ItemTypes.Post, (rawData) => new Post()),
        new TypeResolver(ItemTypes.Author, (rawData) => new Author())
    ]
});