import {deliveryClient} from "../deliveryClient";
import {Post as PostKontentModel} from "../models/post";
import {ItemTypes} from "../constants";

export type LinkData = {
    readonly slug: string;
    readonly title: string;
    readonly taxonomies: ReadonlyArray<string>;
}

const parsePostsList = (post: PostKontentModel): LinkData => {
    const taxonomies = post.articleCategorization?.value.map(value => value.name) ?? [];
    return {
        slug: post.untitledUrlSlug?.value ?? '',
        title: post.title?.value ?? '',
        taxonomies,
    }
};

const invokeFilter = (terms: ReadonlyArray<string>): boolean => !(terms.length <= 0 || terms[0] === '');

export const getAllPostsList = async (terms: ReadonlyArray<string>): Promise<ReadonlyArray<LinkData>> => {
    const response = await deliveryClient
        .items<PostKontentModel>()
        .equalsFilter('system.type', ItemTypes.Post)
        .toPromise();

    return response.items
        .filter(post => invokeFilter(terms)
            ? terms.every(term =>
                post.articleCategorization?.value.map(value => value.name).indexOf(term) !== -1) ?? false
            : post
        )
        .map((post) => parsePostsList(post));
};