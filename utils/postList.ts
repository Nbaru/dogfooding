import {deliveryClient} from "../deliveryClient";
import {Post as PostKontentModel} from "../models/post";
import {ItemTypes, Taxonomies} from "../constants";

export type LinkData = {
    readonly slug: string;
    readonly title: string;
    readonly itemCategorization: ReadonlyArray<string>;
}

const parsePostsList = (post: PostKontentModel): LinkData => {
    const articleCategorizationTerms = post.articleCategorization?.value.map(value => value.name) ?? [];
    const genreTerms = post.gendre?.value.map(value => value.name) ?? [];
    return ({
        slug: post.untitledUrlSlug?.value ?? '',
        title: post.title?.value ?? '',
        itemCategorization: [
            ...articleCategorizationTerms,
            ...genreTerms,
        ],
    });
};

const shouldInvokeFilter = (terms: ReadonlyArray<string>): boolean => !(terms.length <= 0 || terms[0] === '');

type Filter = {
    readonly terms: Array<string>;
    readonly checkedTerms: Array<string>;
}

export const getAllPostsList = async (filters: Map<string, Filter>): Promise<ReadonlyArray<LinkData>> => {
    const articleCategorizationFilter = filters.get(Taxonomies.articleCategorization) as Filter;
    const genreFilter = filters.get(Taxonomies.genre) as Filter;

    const response = await deliveryClient
        .items<PostKontentModel>()
        .equalsFilter('system.type', ItemTypes.Post)
        .anyFilter(
            `elements.${Taxonomies.genre}`,
            shouldInvokeFilter(genreFilter.checkedTerms) ? genreFilter.checkedTerms : genreFilter.terms)
        .anyFilter(
            `elements.${Taxonomies.articleCategorization}`,
            shouldInvokeFilter(articleCategorizationFilter.checkedTerms) ? articleCategorizationFilter.checkedTerms : articleCategorizationFilter.terms)
        .toPromise();

    return response.items
        .map(parsePostsList);
};