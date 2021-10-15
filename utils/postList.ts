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

const shouldInvokeFilter = (terms: ReadonlyArray<string>): boolean => !(terms.length <= 0 || terms[0] === '');

export const getAllPostsList = async (terms: ReadonlyArray<string>): Promise<ReadonlyArray<LinkData>> => {
    // use Deliver for filtering: https://docs.kontent.ai/reference/delivery-api#tag/Filtering-content
    // JS SDK doc
    const response = await deliveryClient
        .items<PostKontentModel>()
        .equalsFilter('system.type', ItemTypes.Post)
        .toPromise();

    return response.items
        .filter(post => shouldInvokeFilter(terms)
            ? terms.every(term =>
                post.articleCategorization?.value.map(value => value.name).includes(term)) ?? false
            : post
        )
        .map(parsePostsList);
};

// filtering -> frontend, backend and data source (Deliver in this example), the data source is the best option
// better taxonomy usage?, more taxonomies
// use code name (unique, encoded,...)