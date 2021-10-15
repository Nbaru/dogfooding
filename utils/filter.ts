export const queryValueName = 'value';

export const getUrlParams = (): string | null => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    return urlParams.get(queryValueName);
};

export const getQueryString = (queryString: string, term: string): string => {
    // @todo simplify the function, work with it as terms set
    // terms of array or set
    // encode special characters and so on
    const termIndex = queryString.search(term);
    if (termIndex >= 0) {
        if (queryString.search(',') === -1) {
            return '';
        }

        return queryString.replace(
            termIndex === 0 ? `${term},` : `,${term}`,
            '');
    }

    return `${queryString},${term}`;
};