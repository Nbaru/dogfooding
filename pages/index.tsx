import {getAllPostsList, LinkData} from "../utils/postList";
import Link from 'next/link';
import {FilterItem, FilterWrapper, ListItemLink, Tag} from "../styledComponets/components";
import {createGuid} from "../utils/createGuid";
import {FC} from "react";
import {getTaxonomies} from "../utils/taxonomies";

type HomeProps = {
    readonly posts: ReadonlyArray<LinkData>;
    readonly taxonomies: ReadonlyArray<{ name: string }>;
}

const Home: FC<HomeProps> = ({posts, taxonomies}) => {
    return (
        <>
            <FilterWrapper>
                {taxonomies.map(taxonomy => {
                    const term = taxonomy.name;
                    return (
                        <FilterItem>
                            <input
                                type="checkbox"
                                id={term}
                                onClick={(e) => {
                                    const urlParams = new URLSearchParams(window.location.search)
                                    urlParams.set(term, term)
                                    window.location.search = urlParams.toString();
                                }
                                }
                            />
                            <label htmlFor={term}>{term}</label>
                        </FilterItem>
                    );
                })}
            </FilterWrapper>

            {posts.map(post => (
                <Link
                    key={createGuid()}
                    href={{
                        pathname: 'posts/[slug]',
                        query: {slug: post.slug}
                    }}
                >
                    <ListItemLink>
                        {post.title}
                        {
                            post.taxonomies.map(taxonomy => (
                                <Tag>
                                    {taxonomy}
                                </Tag>
                            ))
                        }
                    </ListItemLink>
                </Link>
            ))}
        </>
    );
}

export default Home;

export const getStaticProps = async (): Promise<{ readonly props: HomeProps }> => {
    const posts = await getAllPostsList();
    const taxonomies = await getTaxonomies();

    return {
        props: {
            posts,
            taxonomies,
        }
    }
};
