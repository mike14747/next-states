import PropTypes from 'prop-types';

import Link from 'next/link';
import Head from 'next/head';

function Home({ states, page, pageCount, error }) {
    return (
        <div>
            <Head>
                <title>next-states homepage</title>
            </Head>
            <div className="mb-4">
                This is a sample next.js app that fetches &apos;states&apos; from a remote database via &apos;getServerSideProps&apos;.
            </div>
            {error
                ? <div>
                    <h1 className="text-danger">Error!</h1>
                    <div>Status code: {error.statusCode}</div>
                    <div>Message: {error.message}</div>
                </div>
                : states && states.length > 0
                    ? <div>
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
                    </div>
                    : <div>
                        <Head>
                            <title>Not found</title>
                        </Head>
                        No states found!
                    </div>
            }
        </div>
    );
}

Home.propTypes = {
    states: PropTypes.array,
    page: PropTypes.number,
    pageCount: PropTypes.number,
    error: PropTypes.object,
};

export async function getServerSideProps({ req, query }) {
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const page = query.page || 1;
    const limit = query.limit || 9;
    const response = await fetch(`${protocol}://${host}/api/states?page=${page}&limit=${limit}`);
    if (response.ok) {
        const data = await response.json();
        return { props: data };
    } else {
        const error = { statusCode: response.status, message: 'An error occurred trying to fetch states!' };
        return { props: { error } };
    }
}

export default Home;
