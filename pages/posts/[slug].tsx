import Link from "next/link";
import {getPost, Post as PostType} from "../../utils/post";

type PostProps = {
    readonly posts: ReadonlyArray<PostType>
}

const Post = (props: PostProps) => {
    console.log(props);
    return (
        <>
            {props.posts.map(item => (
                // todo fix link to the author
                <div key={item.id}>
                    <div>{item.title}</div>

                    <Link
                        href={{
                            pathname: '/authors/[author]',
                            query: {author: item.authorId}
                        }}
                    >
                        <div>{item.authorName}</div>
                    </Link>
                    <div dangerouslySetInnerHTML={{__html: item.content}}/>
                </div>
            ))}
        </>
    );
}

export default Post;

export const getStaticProps = async ({ params }): Promise<{ readonly props: PostProps }> => {
    const posts = await getPost(params.slug);

    return {
        props: {
            posts: posts,
        }
    }
}

export async function getStaticPaths() {
    return {
        paths: [
            { params: { slug: 'eab202ba-2a8a-4385-8740-4f9c66b089a0' } } // See the "paths" section below
        ],
        fallback: false // See the "fallback" section below
    };
}