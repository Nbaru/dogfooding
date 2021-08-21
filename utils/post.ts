import {deliveryClient} from "../deliveryClient";
import {Post as PostKontentModel} from "../models/post";

export type Post = {
    readonly id: string;
    readonly title: string;
    readonly content: string;
    readonly authorName: string;
    readonly authorId: string;
}

const parsePost = (post: PostKontentModel, id: string): Post => {
    return {
        id,
        title: post.title?.value ?? '',
        content: post.content?.value ?? '',
        // @todo better way?
        authorName: post.authorBio?.value[0].name.value ?? '',
        authorId: post.authorBio?.value[0].urlSlug.value ?? '',
    }

};

export const getPost = async (id: string) => {
    const response = await deliveryClient
        .items<PostKontentModel>()
        .equalsFilter('elements.untitled_url_slug', id)
        .toPromise()

    return response.items.map(post => parsePost(post, id))
};