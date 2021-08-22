import Link from "next/link";
import {getPost, Post as PostType} from "../../utils/post";
import {getAllPostsList} from "../../utils/postList";
import {Params} from "next/dist/next-server/server/router";
import {Subtitle, Title} from "../../styledComponets/components";

type PostProps = {
    readonly posts: ReadonlyArray<PostType>
}

const Post = (props: PostProps) => {
    return (
        <>
            {props.posts.map(item => (
                <div key={item.id}>
                    <Title>
                        {item.title}
                    </Title>

                    <Link
                        href={{
                            pathname: '/authors/[author]',
                            query: {author: item.authorId}
                        }}
                    >
                        <Subtitle>
                            {item.authorName}
                        </Subtitle>
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