import {Author as AuthorKontentModel} from "../models/author";
import {deliveryClient} from "../deliveryClient";
import {ItemTypes} from "../constants";

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

// todo: generic function with constraint to untitledUrlSlug ??
export const getAuthorSlugs = async () => {
    const response = await deliveryClient
        .items<AuthorKontentModel>()
        .equalsFilter('system.type', ItemTypes.Author)
        .toPromise()

    return response.items.map((post) => {
        return {
            id: post.untitledUrlSlug?.value ?? '',
        }
    })
};