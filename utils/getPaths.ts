import {ItemsWithUrlSlug, ItemTypesWithUrlSlug} from "../constants";
import {deliveryClient} from "../deliveryClient";

export const getStaticPathsEntity = async (type: ItemTypesWithUrlSlug, paramName: string) => {
    const response = await deliveryClient
        .items<ItemsWithUrlSlug>()
        .equalsFilter('system.type', type)
        .toPromise();

    const paths = response.items.map((post) => ({
        params: {[paramName]: post.untitledUrlSlug?.value ?? ''},
    }));

    return {
        paths,
        fallback: false,
    }
};