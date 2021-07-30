import {Author} from "../../utils";

const AuthorBio = (props: Author) => {
    return (
        <>
            <div>{props.author}</div>
            <div>{props.bio}</div>
        </>
    )
}

export default AuthorBio;

AuthorBio.getInitialProps = ({ query: { author, bio}}) => {
    return {author, bio}
}