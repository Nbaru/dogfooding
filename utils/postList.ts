import {deliveryClient} from "../deliveryClient";
import {Post as PostKontentModel} from "../models/post";
import {articleCategorizationTaxonomy, ItemTypes} from "../constants";

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

const shouldInvokeFilter = (terms: ReadonlyArray<string>): boolean => !(terms.length <= 0 || terms[0] === '');

export const getAllPostsList = async (checkedTerms: Array<string>, terms: Array<string>): Promise<ReadonlyArray<LinkData>> => {
    const response = await deliveryClient
        .items<PostKontentModel>()
        .equalsFilter('system.type', ItemTypes.Post)
        .anyFilter(
            `elements.${articleCategorizationTaxonomy}`,
            shouldInvokeFilter(checkedTerms) ? checkedTerms : terms)
        .toPromise();

    return response.items
        .map(parsePostsList);
};