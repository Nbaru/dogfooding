import {Post} from "./models/post";
import {Author} from "./models/author";
import {Elements} from "@kentico/kontent-delivery";

export enum ItemTypes {
    Post = 'post',
    Author = 'author',
}

type HasAllItemTypesKeys<T extends {[key in ItemTypes]: any}> = T;

type MapItemTypeToItem = HasAllItemTypesKeys<{
    [ItemTypes.Post]: Post;
    [ItemTypes.Author]: Author;
}>

// for coupling ItemTypes enum with item models => map [ItemTypes, ItemModel], e. g. ['post', Post]
type CreateValueEntries<T extends ItemTypes> = T extends any ? [T, MapItemTypeToItem[T]] : never;

// create tuple key value, only entities with untitledUrlSlug
type FilterEntriesWithUrlSlug<T extends [ItemTypes, any]> = T extends [infer TEnum, infer TValue]
    ? TValue extends {untitledUrlSlug?: Elements.UrlSlugElement}
        ? T
        : never
    : never;

// get filtered ItemTypes
type FilterItemTypesWithUrlSlug<T extends ItemTypes> = FilterEntriesWithUrlSlug<CreateValueEntries<T>>[0];

export type ItemTypesWithUrlSlug = FilterItemTypesWithUrlSlug<ItemTypes>;
export type ItemsWithUrlSlug = MapItemTypeToItem[ItemTypesWithUrlSlug];
