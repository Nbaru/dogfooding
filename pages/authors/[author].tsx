import {Author} from "../../utils";

const AuthorBio = (props: Author) => {
    return (
        <>
            <div>{props.author}</div>
            {/*todo where is kontent? :D*/}
            <div dangerouslySetInnerHTML={{__html: props.bio}}/>
        </>
    )
}

export default AuthorBio;

AuthorBio.getInitialProps = ({ query: { author, bio}}) => {
    return {author, bio}
}