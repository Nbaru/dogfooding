import {deliveryClient} from "../deliveryClient";
import {Post as PostKontentModel} from "../models/post";
import {ItemTypes} from "../constants";

export type LinkData = {
    readonly slug: string;
    readonly title: string;
    readonly taxonomies: ReadonlyArray<string>;
}

const parsePostsList = (post: PostKontentModel): LinkData => {
    console.log(post.articleCategorization?.value);
    const taxonomies = post.articleCategorization?.value.map(value => value.name) ?? [];
    return {
        slug: post.untitledUrlSlug?.value ?? '',
        title: post.title?.value ?? '',
        taxonomies,
    }
};

export const getAllPostsList = async (): Promise<ReadonlyArray<LinkData>> => {
    const response = await deliveryClient
        .items<PostKontentModel>()
        .equalsFilter('system.type', ItemTypes.Post)
        .toPromise();

    return response.items.map((post) => parsePostsList(post));
};