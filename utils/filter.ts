import {Taxonomies} from "../constants";
import {getTerms} from "./taxonomies";
import {ParsedUrlQuery} from "querystring";

export const getQueryData = (): Map<string, Array<string>> =>
    Object.values(Taxonomies)
        .reduce((data, taxonomy) =>
            data.set(taxonomy, new URLSearchParams(window.location.search).get(taxonomy)?.split(',') ?? []),
            new Map);

const getParams = (
    params: Array<string>,
    term: string,
): Array<string> => {
    const termIndex = params.indexOf(term);
    if (termIndex > -1) {
        params.splice(termIndex, 1);
        return params;
    }
    return (params.length > 0 && params[0] !== '')
        ? [...params, term]
        : [term];
};

export const getQuery = (
    name: string,
    queryData: Map<string, Array<string>>,
    term: string,
): string => {
    const newUrlParameters = getParams(queryData.get(name) ?? [], term);
    queryData.set(name, newUrlParameters);

    return [...queryData]
        .reduce((prev, current, i) =>
            prev + `${current[0]}=${current[1]}${current.length === i - 1 ? '' : '&'}`, '')
        .slice(0, -1);
};

export const getFiltersData = (query: ParsedUrlQuery) =>
    Object.values(Taxonomies).map(async (taxonomy: string) => {
        const terms = await getTerms(taxonomy);
        const checkedTerms = (query[taxonomy] as string)
            ?.split(',')
            .map(term => term.replace(' ', '_')) ?? [];

        return {
            name: taxonomy,
            terms,
            checkedTerms,
        };
    });