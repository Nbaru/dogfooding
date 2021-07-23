import {getAllItems, ItemType, Article} from "../utils";

type HomeProps = {
    readonly items: Array<Article>
}

const Home = (props: HomeProps) =>  {
    return (
        <>
            {props.items.map(item => item.type === ItemType.Article ? (
                <div key={item.title}>
                    <div>{item.title}</div>
                    <div>{item.author.name}</div>
                    <div>{item.author.bio}</div>
                    <div dangerouslySetInnerHTML={{__html: item.content}}/>
                </div>
            ) : null)}
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
