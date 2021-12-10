import React from "react";
import {FilterItem, FilterWrapper} from "../styledComponets/components";
import {getQueryData, getQuery} from "../utils/filter";
import {useRouter} from "next/router";

export type FilterData = {
    readonly terms: ReadonlyArray<{name: string, codeName: string}>;
    readonly checkedTerms: ReadonlyArray<string>;
    readonly name: string;
};

export const Filter: React.FC<FilterData> = ({ terms, checkedTerms, name }) => {
    const router = useRouter();
    const setQueryToUrlAndRefresh = async (query: string) => {
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
                        <FilterItem key={term.codeName}>
                            <input
                                type="checkbox"
                                id={term.codeName}
                                onClick={async () => await setQueryToUrlAndRefresh(getQuery(name, getQueryData(), term.codeName))
                                }
                                defaultChecked={checkedTerms?.includes(term.codeName) ?? false}
                            />
                            {/*@todo*/}
                            <label htmlFor={term.codeName}>{term.name}</label>
                        </FilterItem>
                    )
                )}
        </FilterWrapper>
    )
};