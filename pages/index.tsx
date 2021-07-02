import { getAllItems } from "../utils";

//todo: types
const Home = (props: any) =>  {
    const item = props.items[0];
    console.log(props.items);

    return (
        <>
            <div>{item.title}</div>
            <div>{item.content}</div>
        </>
    )
}

export default Home;

export const getStaticProps = async () =>
    await getAllItems()
        .then((values) => (
            {
                props: {
                    items: values
                }
            }
        ))
