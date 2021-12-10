import {deliveryClient} from "../deliveryClient";

export const getTerms = async (name: string): Promise<Array<{name: string, codeName: string}>> => {
    const response = await deliveryClient
        .taxonomy(name)
        .toPromise();

    return response?.taxonomy.terms.map(term => ({name: term.name, codeName: term.codename}));
};