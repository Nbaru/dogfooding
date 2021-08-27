import {Author as AuthorKontentModel} from "../models/author";
import {deliveryClient} from "../deliveryClient";
import {ItemsWithUrlSlug, ItemTypes, ItemTypesWithUrlSlug} from "../constants";
import {ContentItem, Elements} from "@kentico/kontent-delivery";

export type Author = {
    readonly authorName: string;
    readonly bio: string;
}

const parseAuthor = (author: AuthorKontentModel): Author => ({
    authorName: author.name?.value ?? '',
    bio: author.bio?.value ?? '',
});

export const getAuthor = async (slug: string): Promise<Author> => {
    const response = await deliveryClient
        .items<AuthorKontentModel>()
        .equalsFilter('elements.untitled_url_slug', slug)
        .toPromise()

    return response.items.map(author => parseAuthor(author))?.[0];
};
