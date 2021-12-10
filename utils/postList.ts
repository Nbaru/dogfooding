import {deliveryClient} from "../deliveryClient";
import {Post as PostKontentModel} from "../models/post";
import {ItemTypes, Taxonomies} from "../constants";
import {Elements} from "@kentico/kontent-delivery";
import {FilterData} from "../components/Filter";

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

const shouldInvokeFilter = (terms: ReadonlyArray<string>): boolean => !(terms.length <= 0);

export const getAllPostsList = async (filters: ReadonlyArray<FilterData>): Promise<ReadonlyArray<LinkData>> => {
    const response = await deliveryClient
        .items<PostKontentModel>()
        .equalsFilter('system.type', ItemTypes.Post);

    filters.forEach((filter) => {
        if (shouldInvokeFilter(filter.checkedTerms)) {
            response.anyFilter(`elements.${filter.name}`, [...filter.checkedTerms]);
        }
    });

    const resolvedResponse = await response.toPromise();
    return resolvedResponse.items
        .map(parsePostsList);
};