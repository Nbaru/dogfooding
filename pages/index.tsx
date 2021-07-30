import {getAllPostsList, PostList} from "../utils/postList";
import Link from 'next/link';

type HomeProps = {
    readonly posts: ReadonlyArray<PostList>
}

const Home = (props: HomeProps) =>
    (
        <>
            {props.posts.map(post => (
                <Link
                    key={post.id}
                    href={{
                        pathname: 'posts/[slug]',
                        query: { slug: post.id }
                    }}
                >
                    <div>{post.title}</div>
                </Link>
            ))}
        </>
    )

export default Home;

export const getStaticProps = async (): Promise<{ readonly props: HomeProps }> => {
    const items = await getAllPostsList();
    return {
        props: {
            posts: items
        }
    }
};
