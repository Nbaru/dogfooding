import React from "react";
import {FilterItem, FilterWrapper} from "../styledComponets/components";
import {getQueryString, getUrlParams, queryValueName} from "../utils/filter";
import {useRouter} from "next/router";

type FilterProps = {
    readonly taxonomies: ReadonlyArray<{ name: string }>;
    readonly checkedTerms: ReadonlyArray<string>;
};

export const Filter: React.FC<FilterProps> = ({ taxonomies, checkedTerms }) => {
    const router = useRouter();
    const refreshData = async (query: string) => {
        // change url, but do not call `getServerSideProps`
        await router.push(
            router.query,
            {query: `${queryValueName}=${query}`},
            {shallow: true}
        );

        // call server side props with new query value
        await router.push(router.query);
    };

    return (
        <FilterWrapper>
            {taxonomies.map(taxonomy => {
                const term = taxonomy.name;
                return (
                    <FilterItem key={term}>
                        <input
                            type="checkbox"
                            id={term}
                            onClick={async () => {
                                const queryString = getUrlParams();
                                const newQueryString = queryString ? getQueryString(queryString, term) : term;
                                await refreshData(newQueryString);
                                }
                            }
                            defaultChecked={checkedTerms?.includes(term) ?? false}
                        />
                        <label htmlFor={term}>{term}</label>
                    </FilterItem>
                );
            })}
        </FilterWrapper>
    )
};