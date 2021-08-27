import {deliveryClient} from "../deliveryClient";
import {Post as PostKontentModel} from "../models/post";

export type Post = {
    readonly title: string;
    readonly content: string;
    readonly authorName: string;
    readonly authorSlug: string;
}

const parsePost = (post: PostKontentModel): Post => ({
    title: post.title?.value ?? '',
    content: post.content?.value ?? '',
    authorName: post.authorBio?.value?.[0].name?.value ?? '',
    authorSlug: post.authorBio?.value?.[0].untitledUrlSlug?.value ?? '',
});

export const getPost = async (slug: string): Promise<Post> => {
    const response = await deliveryClient
        .items<PostKontentModel>()
        .equalsFilter('elements.untitled_url_slug', slug)
        .toPromise();

    return response.items.map(post => parsePost(post))?.[0];
};