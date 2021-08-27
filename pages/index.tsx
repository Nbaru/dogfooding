import {getAllPostsList, LinkData} from "../utils/postList";
import Link from 'next/link';
import {ListItemLink} from "../styledComponets/components";
import {createGuid} from "../utils/createGuid";
import {FC} from "react";

type HomeProps = {
    readonly posts: ReadonlyArray<LinkData>
}

const Home: FC<HomeProps> = ({posts}) =>
    (
        <>
            {posts.map(post => (
                <Link
                    key={createGuid()}
                    href={{
                        pathname: 'posts/[slug]',
                        query: { slug: post.slug }
                    }}
                >
                    <ListItemLink >
                        {post.title}
                    </ListItemLink>
                </Link>
            ))}
        </>
    )

export default Home;

export const getStaticProps = async (): Promise<{ readonly props: HomeProps }> => {
    const posts = await getAllPostsList();
    return {
        props: {
            posts,
        }
    }
};
