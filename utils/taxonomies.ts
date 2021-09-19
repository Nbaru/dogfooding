import {deliveryClient} from "../deliveryClient";
import {articleCategorizationTaxonomy} from "../constants";

//todo: recursion for nested terms?? (map in map? :D)
export const getTaxonomies = async (): Promise<ReadonlyArray<{ name: string }>> => {
    const response = await deliveryClient
        .taxonomy(articleCategorizationTaxonomy)
        .toPromise();

    return response?.taxonomy.terms.map(term => ({ name: term.name }));
};