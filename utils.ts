import {deliveryClient} from "./deliveryClient";
import {Article} from "./article";

export type Post = {
    readonly title: string;
    readonly content: string;
}

const parsePost = (post: Article): Post => {
    return {
        title: post.title?.value ?? '',
        content: post.content?.value ?? '',
    }
};

export const getAllItems = async () => {
    const response = await deliveryClient
        .items<Article>()
        .toPromise();

    return response.items.map((post: Article) => parsePost(post));
};