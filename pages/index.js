import Head from 'next/head';

const Home = () => {
    return (
        <div className="m-4 text-danger bg-white">
            <Head>
                <title>next-states homepage</title>
            </Head>
            <h1 className="text-center">This is the homepage!</h1>
        </div>
    );
};

export default Home;
