import {deliveryClient} from "../deliveryClient";

export const getTerms = async (name: string): Promise<Array<string>> => {
    const response = await deliveryClient
        .taxonomy(name)
        .toPromise();

    return response?.taxonomy.terms.map(term => term.codename);
};