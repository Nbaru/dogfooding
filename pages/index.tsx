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
    readonly taxonomies: ReadonlyArray<string>;
    readonly checkedTerms: ReadonlyArray<string>;
}

const Home: FC<HomeProps> = ({posts, taxonomies, checkedTerms}) =>
    (
        <>
            <Filter
                taxonomies={taxonomies}
                checkedTerms={checkedTerms}
            />

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
                                post.taxonomies.map(taxonomy => {
                                    const id = createGuid();
                                    return (
                                        <Tag key={id}>
                                            {taxonomy}
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
    const query = context.query.value as string;
    const checkedTerms = query?.split(',') ?? [];
    const taxonomies = await getTaxonomies();
    const posts = await getAllPostsList(checkedTerms, taxonomies);

    return {
        props: {
            posts,
            taxonomies,
            checkedTerms,
        }
    }
};
