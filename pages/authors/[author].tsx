import {Params} from "next/dist/next-server/server/router";
import {Author as AuthorType, getAuthor} from "../../utils/author";
import {Title} from "../../styledComponets/components";
import {FC} from "react";
import {ItemTypes} from "../../constants";
import {getStaticPathsEntity} from "../../utils/getPaths";

const AuthorBio: FC<AuthorType> = ({ authorName, bio, portrait }) =>
    (
        <>
            <Title>
                {authorName}
            </Title>

            <div dangerouslySetInnerHTML={{__html: bio}}/>
            <img src={portrait} />
        </>
    )

export default AuthorBio;

export const getStaticProps = async ({ params: { author } }: Params): Promise<{ readonly props: AuthorType }> => {
    const item = await getAuthor(author);

    return {
        props: {
            authorName: item.authorName,
            bio: item.bio,
            portrait: item.portrait,
        }
    };
};

export const getStaticPaths =  () => getStaticPathsEntity(ItemTypes.Author,'author')

