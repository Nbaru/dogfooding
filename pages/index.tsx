import {getAllItems, Post} from "../utils";

type HomeProps = {
    items: Array<Post>
}

const Home = (props: HomeProps) =>  {
    const item = props.items[0];

    return (
        <>
            <div>{item.title}</div>
            <div dangerouslySetInnerHTML={{__html: item.content}}/>
        </>
    )
};

export default Home;

export const getStaticProps = async (): Promise<{ readonly props: HomeProps }> => {
    const items = await getAllItems();
    return {
        props: {
            items
        }
    }
};
