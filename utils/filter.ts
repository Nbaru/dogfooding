export const queryValueName = 'value';

export const getUrlParamsList = (): Array<string> =>
    new URLSearchParams(window.location.search).get(queryValueName)?.split(',') ?? [];

export const getQueryString = (urlParamsList: Array<string>, term: string): string => {
    const termIndex = urlParamsList.indexOf(term);
    if (termIndex > -1) {
        urlParamsList.splice(termIndex, 1);
        return urlParamsList.join();
    }
    return `${urlParamsList.join()},${term}`;
};