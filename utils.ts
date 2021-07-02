import {deliveryClient} from "./deliveryClient";

const parsePost = (post: any) => {
    return {
        title: post.title.value,
        content: post.content.value,
    }
}

export const getAllItems = async () => {
    return await deliveryClient
        .items()
        .toPromise()
        .then((response: any) => response.items.map((post: any) => parsePost(post)));
}