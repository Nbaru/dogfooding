import {deliveryClient} from "../deliveryClient";
import {Post as PostKontentModel} from "../models/post";
import {ItemTypes, Taxonomies} from "../constants";
import {Elements} from "@kentico/kontent-delivery";

export type LinkData = {
    readonly slug: string;
    readonly title: string;
    readonly itemCategorization: ReadonlyArray<string>;
}

const getItemCategorization = (post: PostKontentModel): ReadonlyArray<string> =>
    Object.values(Taxonomies).reduce((termsList, taxonomyName) =>
        [...termsList, ...post[taxonomyName]
            ?.value.map((value: Elements.TaxonomyElement) => value.name)], new Array());

const parsePostsList = (post: PostKontentModel): LinkData =>
    ({
        slug: post.untitledUrlSlug?.value ?? '',
        title: post.title?.value ?? '',
        itemCategorization: getItemCategorization(post),
    });

const shouldInvokeFilter = (terms: ReadonlyArray<string>): boolean => !(terms.length <= 0 || terms[0] === '');

type Filter = {
    readonly terms: Array<string>;
    readonly checkedTerms: Array<string>;
}

// limitations: post must has term from every taxonomy
// exists better way with filtering?
export const getAllPostsList = async (filters: Map<string, Filter>): Promise<ReadonlyArray<LinkData>> => {
    const articleCategorizationFilter = filters.get(Taxonomies.articleCategorization) as Filter;
    const genreFilter = filters.get(Taxonomies.genre) as Filter;
    const difficultyFilter = filters.get(Taxonomies.difficulty) as Filter;

    const response = await deliveryClient
        .items<PostKontentModel>()
        .equalsFilter('system.type', ItemTypes.Post)
        .anyFilter(
            `elements.${Taxonomies.genre}`,
            shouldInvokeFilter(genreFilter.checkedTerms) ? genreFilter.checkedTerms : genreFilter.terms)
        .anyFilter(
            `elements.${Taxonomies.articleCategorization}`,
            shouldInvokeFilter(articleCategorizationFilter.checkedTerms) ? articleCategorizationFilter.checkedTerms : articleCategorizationFilter.terms)
        .anyFilter(
            `elements.${Taxonomies.difficulty}`,
            shouldInvokeFilter(difficultyFilter.checkedTerms) ? difficultyFilter.checkedTerms : difficultyFilter.terms)
        .toPromise();

    return response.items
        .map(parsePostsList);
};