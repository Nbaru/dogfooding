import {Params} from "next/dist/next-server/server/router";
import {Author as AuthorType, getAuthor} from "../../utils/author";
import {Title} from "../../styledComponets/components";
import {FC} from "react";
import {ItemTypes} from "../../constants";
import {getStaticPathsEntity} from "../../utils/getPaths";

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

export const getStaticPaths =  () => getStaticPathsEntity(ItemTypes.Author,'author')

