import {getAllPostsList, LinkData} from "../utils/postList";
import Link from 'next/link';
import {ListItemLink, Tag} from "../styledComponets/components";
import {createGuid} from "../utils/createGuid";
import {FC} from "react";
import {getTaxonomies} from "../utils/taxonomies";
import {GetServerSideProps} from "next";
import {Filter} from "../components/Filter";

type HomeProps = {
    readonly posts: ReadonlyArray<LinkData>;
    readonly taxonomies: ReadonlyArray<{ name: string }>;
    readonly checkedTerms: ReadonlyArray<string>;
}

const Home: FC<HomeProps> = ({posts, taxonomies, checkedTerms}) =>
    (
        <>
            <Filter
                taxonomies={taxonomies}
                checkedTerms={checkedTerms}
            />

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
    )

export default Home;

export const getServerSideProps: GetServerSideProps = async ( context ): Promise<{ readonly props: HomeProps }> => {
    const query = context.query.value as string;
    const checkedTerms = query?.split(',') ?? [];
    const posts = await getAllPostsList(checkedTerms);

    const taxonomies = await getTaxonomies();

    return {
        props: {
            posts,
            taxonomies,
            checkedTerms,
        }
    }
};
