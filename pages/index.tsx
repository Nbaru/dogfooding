import {getAllPostsList, LinkData} from "../utils/postList";
import Link from 'next/link';
import {FilterGroup, ListItemLink, Tag} from "../styledComponets/components";
import {createGuid} from "../utils/createGuid";
import {FC} from "react";
import {getTerms} from "../utils/taxonomies";
import {GetServerSideProps} from "next";
import {Filter, FilterData} from "../components/Filter";
import {Taxonomies} from "../constants";
import {getFiltersData} from "../utils/filter";

type HomeProps = {
    readonly posts: ReadonlyArray<LinkData>;
    readonly filters: ReadonlyArray<FilterData>;
}

const Home: FC<HomeProps> = ({ posts, filters}) =>
    (
        <>
            <FilterGroup>
                {filters.map(filter => {
                    const id = createGuid();
                    return (
                        <Filter
                            key={id}
                            name={filter.name}
                            terms={filter.terms}
                            checkedTerms={filter.checkedTerms}
                        />
                    );
                })}
            </FilterGroup>

            {posts.map(post => {
                const id = createGuid();
                return (
                    <Link
                        key={id}
                        href={{
                            pathname: 'posts/[slug]',
                            query: {slug: post.slug}
                        }}
                    >
                        <ListItemLink>
                            {post.title}
                            {
                                post.itemCategorization.map(term => {
                                    const id = createGuid();
                                    return (
                                        <Tag key={id}>
                                            {term}
                                        </Tag>
                                    );
                                })
                            }
                        </ListItemLink>
                    </Link>
                );
            })}
        </>
    )

export default Home;

export const getServerSideProps: GetServerSideProps = async ( context ): Promise<{ readonly props: HomeProps }> => {
    const filters = await Promise.all(getFiltersData(context.query));

    const posts = await getAllPostsList(
        filters
            .reduce((data, filter) => 
                data.set(filter.name, {
                    terms: filter.terms,
                    checkedTerms: filter.checkedTerms
                }), new Map)
    );

    return {
        props: {
            posts,
            filters,
        }
    }
};
