import Link from "next/link";
import {getPost, Post as PostType} from "../../utils/post";
import {getAllPostsList} from "../../utils/postList";
import {Params} from "next/dist/next-server/server/router";

type PostProps = {
    readonly posts: ReadonlyArray<PostType>
}

const Post = (props: PostProps) => {
    return (
        <>
            {props.posts.map(item => (
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

export const getStaticProps = async ({ params: { slug } }: Params): Promise<{ readonly props: PostProps }> => {
    const posts = await getPost(slug);

    return {
        props: {
            posts: posts,
        }
    }
}

export const getStaticPaths = async () => {
    const posts = await getAllPostsList();
    const paths = posts.map(post => ({
        params: { slug: post.id }
    }));
    return { paths, fallback: false };
}