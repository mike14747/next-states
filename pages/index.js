// import Head from 'next/head';

// const Home = () => {
//     return (
//         <div className="m-4 text-danger bg-white">
//             <Head>
//                 <title>next-states homepage</title>
//             </Head>
//             <h1 className="text-center">This is the homepage!</h1>
//         </div>
//     );
// };

// export default Home;

import PropTypes from 'prop-types';

import Link from 'next/link';

function Home({ states, page, pageCount }) {
    // console.log('states:', states, 'page:', page, 'pageCount:', pageCount);
    return (
        <>
            <ul>
                {states.map((state) => (
                    <li key={state.id}>
                        <Link href={`/state?id=${state.id}`}>
                            <a>
                                <span>{state.state_name}</span>
                            </a>
                        </Link>
                    </li>
                ))}
            </ul>
            <nav>
                {page > 1 && (
                    <Link href={`/?page=${page - 1}&limit=9`}>
                        <a>Previous</a>
                    </Link>
                )}
                {page < pageCount && (
                    <Link href={`/?page=${page + 1}&limit=9`}>
                        <a className="next">Next</a>
                    </Link>
                )}
            </nav>
        </>
    );
}

Home.propTypes = {
    states: PropTypes.array,
    page: PropTypes.number,
    pageCount: PropTypes.number,
};

export async function getServerSideProps({ req, query }) {
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const page = query.page || 1;
    const limit = query.limit || 9;
    const res = await fetch(`${protocol}://${host}/api/states?page=${page}&limit=${limit}`);
    // console.log(res.status);
    // return { props: {} };
    const data = await res.json();
    return { props: data };
}

export default Home;
