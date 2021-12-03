import React from "react";
import {FilterItem, FilterWrapper} from "../styledComponets/components";
import {getQueryData, getQuery} from "../utils/filter";
import {useRouter} from "next/router";

export type FilterData = {
    readonly terms: ReadonlyArray<string>;
    readonly checkedTerms: ReadonlyArray<string>;
    readonly name: string;
};

export const Filter: React.FC<FilterData> = ({ terms, checkedTerms, name }) => {
    const router = useRouter();
    const refreshData = async (query: string) => {
        // change url, but do not call `getServerSideProps`
        await router.push(
            router.query,
            {query: query},
            {shallow: true}
        );

        // call server side props with new query value
        await router.push(router.query);
    };

    return (
        <FilterWrapper>
            {terms
                .map(term =>
                    (
                        <FilterItem key={term}>
                            <input
                                type="checkbox"
                                id={term}
                                onClick={async () => await refreshData(getQuery(name, getQueryData(), term))
                                }
                                defaultChecked={checkedTerms?.includes(term) ?? false}
                            />
                            <label htmlFor={term}>{term.replace('_', ' ')}</label>
                        </FilterItem>
                    )
                )}
        </FilterWrapper>
    )
};