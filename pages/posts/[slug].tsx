import Link from "next/link";
import {getPost, Post as PostType} from "../../utils/post";
import {getAllPostsList} from "../../utils/postList";
import {Params} from "next/dist/next-server/server/router";
import {Subtitle, Title} from "../../styledComponets/components";
import {FC} from "react";


const Post: FC<PostType> = ({ title, authorSlug, authorName, content}) =>
    (
        <div>
            <Title>
                {title}
            </Title>

            <Link
                href={{
                    pathname: '/authors/[author]',
                    query: {author: authorSlug}
                }}
            >
                <Subtitle>
                    {authorName}
                </Subtitle>
            </Link>
            <div dangerouslySetInnerHTML={{__html: content}}/>
        </div>
    );

export default Post;

export const getStaticProps = async ({ params: { slug } }: Params): Promise<{ readonly props: PostType }> => {
    const post = await getPost(slug);

    return {
        props: {
            title: post.title,
            authorSlug: post.authorSlug,
            authorName: post.authorName,
            content: post.content,
        }
    };
};

export const getStaticPaths = async () => {
    const posts = await getAllPostsList();
    const paths = posts.map(post => ({
        params: { slug: post.slug }
    }));
    return { paths, fallback: false };
}