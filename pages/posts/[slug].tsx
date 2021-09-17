import Link from "next/link";
import {getPost, Post as PostType} from "../../utils/post";
import {Params} from "next/dist/next-server/server/router";
import {Subtitle, Title} from "../../styledComponets/components";
import {FC} from "react";
import {ItemTypes} from "../../constants";
import {getStaticPathsEntity} from "../../utils/getPaths";


const Post: FC<PostType> = ({ title, authorSlug, authorName, content, imageUrl}) =>
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
            <img src={imageUrl}/>
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
            imageUrl: post.imageUrl,
        }
    };
};

export const getStaticPaths = () => getStaticPathsEntity(ItemTypes.Post, 'slug');