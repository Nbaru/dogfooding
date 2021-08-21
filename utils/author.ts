import {Author as AuthorKontentModel} from "../models/author";
import {deliveryClient} from "../deliveryClient";
import {ItemTypes} from "../constants";

export type Author = {
    readonly id: string;
    readonly authorName: string;
    readonly bio: string;
}

const parseAuthor = (author: AuthorKontentModel, id: string): Author => {
    return {
        id,
        authorName: author.name?.value ?? '',
        bio: author.bio?.value ?? '',
    }

};

export const getAuthor = async (id: string) => {
    const response = await deliveryClient
        .items<AuthorKontentModel>()
        .equalsFilter('elements.untitled_url_slug', id)
        .toPromise()

    return response.items.map(author => parseAuthor(author, id))
};

export const getAuthorIds = async () => {
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