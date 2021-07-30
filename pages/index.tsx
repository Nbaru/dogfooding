import {getAllItems, ItemType, Article} from "../utils";
import Link from 'next/link';

type HomeProps = {
    readonly items: Array<Article>
}

const Home = (props: HomeProps) =>  {
    return (
        <>
            {props.items.map(item => {
                // const authorUrl = item.author.author.replace(/\s/g, '-');

                return item.type === ItemType.Article ? (
                    // todo: better key
                    <div key={item.title}>
                        <div>{item.title}</div>
                        <Link
                            href={{
                                pathname: 'authors/[author]',
                                query: {author: item.author.author, bio: item.author.bio}
                            }}
                            //as={`authors/${authorUrl}`}
                        >
                            <div>{item.author.author}</div>
                        </Link>
                        <div dangerouslySetInnerHTML={{__html: item.content}}/>
                    </div>
                ) : null;
            })}
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
