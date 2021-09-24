export const queryValueName = 'value';

export const getUrlParams = (): string | null => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    return urlParams.get(queryValueName.toString());
};

export const getQueryString = (queryString: string, term: string): string => {
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