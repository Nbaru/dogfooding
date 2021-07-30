import {deliveryClient} from "./deliveryClient";
import {Article as ArticleItemType} from "./article";
import {Author as AuthorItemType} from "./author";

export enum ItemType {
    Article = 'article',
    Author = 'author_bio',

}

export type Author = {
    readonly author: string;
    readonly bio: string;
    //readonly imageUrl: string;
}

export type Article = {
    readonly type: string;
    readonly title: string;
    readonly content: string;
    readonly author: Author;
}

type Post = ArticleItemType | AuthorItemType;

const parsePost = (post: Post): Article => {
    return {
        type: post.system.codename,
        title: post.title?.value ?? 'empty',
        content: post.content?.value ?? 'empty',
        //@todo fragileeeee
        author: {
            author: post.authorBio?.value[0].name.value ?? 'empty',
            bio: post.authorBio?.value[0].bio.value ?? 'empty',
        }
    }
};

export const getAllItems = async () => {
    const response = await deliveryClient
        .items()
        .toPromise();

    return response.items.map((post) => parsePost(post));
};