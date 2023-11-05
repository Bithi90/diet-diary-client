
import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";


const Home = () => {
    return (
        <>
            <Helmet>
                <title>Diary | Home</title>
            </Helmet>
            <div>
                <Banner></Banner>
            </div>
        </>

    );
};

export default Home;   