import {Params} from "next/dist/next-server/server/router";
import {Author as AuthorType, getAuthor, getAuthorSlugs} from "../../utils/author";
import {Title} from "../../styledComponets/components";
import {FC} from "react";

const AuthorBio: FC<AuthorType> = ({ authorName, bio }) =>
    (
        <>
            <Title>
                {authorName}
            </Title>

            <div dangerouslySetInnerHTML={{__html: bio}}/>
        </>
    )

export default AuthorBio;

export const getStaticProps = async ({ params: { author } }: Params): Promise<{ readonly props: AuthorType }> => {
    const item = await getAuthor(author);

    return {
        props: {
            authorName: item.authorName,
            bio: item.bio,
        }
    };
};

export const getStaticPaths = async () => {
    // todo: function for every getStaticPaths -> getStaticPathsEntity
    const authorsSlugs = await getAuthorSlugs();
    const paths = authorsSlugs.map(author => ({
        params: { author: author.id }
    }));
    return {
        paths,
        fallback: false,
    }
};

