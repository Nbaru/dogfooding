import React from "react";
import {FilterItem, FilterWrapper} from "../styledComponets/components";
import {getQueryString, getUrlParamsList, queryValueName} from "../utils/filter";
import {useRouter} from "next/router";

type FilterProps = {
    readonly taxonomies: ReadonlyArray<string>;
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
            {taxonomies.map(term =>
                (
                    <FilterItem key={term}>
                        <input
                            type="checkbox"
                            id={term}
                            onClick={async () => {
                                const urlParamsList = getUrlParamsList();
                                await refreshData(
                                    (urlParamsList.length > 0 && urlParamsList[0] !== '')
                                        ? getQueryString(urlParamsList, term)
                                        : term
                                );
                            }
                            }
                            defaultChecked={checkedTerms?.includes(term) ?? false}
                        />
                        {/*@todo: why defaultChecked works? without page refresh*/}
                        <label htmlFor={term}>{term}</label>
                    </FilterItem>
                ))}
        </FilterWrapper>
    )
};