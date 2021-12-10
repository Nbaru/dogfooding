import {Taxonomies} from "../constants";
import {getTerms} from "./taxonomies";
import {ParsedUrlQuery} from "querystring";

const ensureTermsList = (termsString: string): ReadonlyArray<string> | [] =>
    termsString.length > 0 ? termsString.split(',') : [];

export const getQueryData = (): Map<string, Array<string>> =>
    Object.values(Taxonomies)
        .reduce((data, taxonomy) =>
                data.set(
                    taxonomy,
                    ensureTermsList(new URLSearchParams(window.location.search).get(taxonomy) ?? ''),
                ),
            new Map);

const toggleTerm = (
    params: Array<string>,
    term: string,
): Array<string> =>
    params.includes(term)
        ? params.filter((t) => term !== t)
        : [...params, term];

export const getQuery = (
    name: string,
    queryData: Map<string, Array<string>>,
    term: string,
): string => {
    const newUrlParameters = toggleTerm(queryData.get(name) ?? [], term);
    queryData.set(name, newUrlParameters);

    return [...queryData].map(([name, terms]) => `${name}=${terms.join(',')}`).join('&');
};

export const getFiltersData = (query: ParsedUrlQuery) =>
    Object.values(Taxonomies).map(async (taxonomy: string) => {
        const terms = await getTerms(taxonomy);
        const checkedTermsString = (query[taxonomy] as string) ?? '';

        return {
            name: taxonomy,
            terms,
            checkedTerms: ensureTermsList(checkedTermsString),
        };
    });