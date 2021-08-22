import {Params} from "next/dist/next-server/server/router";
import {Author as AuthorType, getAuthor, getAuthorIds} from "../../utils/author";
import {Title} from "../../styledComponets/components";

type AuthorProps = {
    readonly items: ReadonlyArray<AuthorType>
}

const AuthorBio = (props: AuthorProps) => {
    return (
        <>
            {props.items.map(item => (
                <div key={item.id}>
                    <Title>
                        {item.authorName}
                    </Title>

                    <div dangerouslySetInnerHTML={{__html: item.bio}}/>
                </div>
            ))}
        </>
    );
}

export default AuthorBio;

export const getStaticProps = async ({ params: { author } }: Params): Promise<{ readonly props: AuthorProps }> => {
    const items = await getAuthor(author);

    return {
        props: {
            items,
        }
    };
};

export const getStaticPaths = async () => {
    // todo: function for every getStaticPaths
    const authors = await getAuthorIds();
    const paths = authors.map(author => ({
        params: { author: author.id }
    }));
    return {
        paths,
        fallback: false,
    }
};

