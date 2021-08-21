import {deliveryClient} from "../deliveryClient";
import {Post as PostKontentModel} from "../models/post";
import {ItemTypes} from "../constants";

export type PostList = {
    readonly id: string;
    readonly title: string;
}

const parsePostsList = (post: PostKontentModel): PostList => {
    return {
        id: post.untitledUrlSlug?.value ?? '',
        title: post.title?.value ?? '',
    }
};

export const getAllPostsList = async () => {
    const response = await deliveryClient
        .items<PostKontentModel>()
        .equalsFilter('system.type', ItemTypes.Post)
        .toPromise();

    return response.items.map((post) => parsePostsList(post));
};