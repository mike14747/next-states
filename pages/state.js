import Link from 'next/link';
import Head from 'next/head';
import PropTypes from 'prop-types';

function StatePage({ state, error }) {
    return (
        <div>
            {error
                ? <div>
                    <h1 className="text-danger">Error!</h1>
                    <div>Status code: {error.statusCode}</div>
                    <div>Message: {error.message}</div>
                </div>
                : state
                    ? <div>
                        <Head>
                            <title>State: {state.state_name}</title>
                        </Head>
                        <h1>{state.state_name}</h1>
                        <p>{state.abbrev}</p>
                        <p>{state.capital}</p>
                        <Link href="/">
                            <a>← Home</a>
                        </Link>
                    </div>
                    : <div>
                        <Head>
                            <title>Not found</title>
                        </Head>
                        State was not found.
                    </div>
            }
        </div>
    );
}

StatePage.propTypes = {
    state: PropTypes.object,
    error: PropTypes.object,
};

export async function getServerSideProps({ req, query }) {
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers['x-forwarded-host'] || req.headers.host;

    const response = await fetch(`${protocol}://${host}/api/states/${query.id}`);
    if (response.ok) {
        const data = await response.json();
        return { props: data };
    } else {
        const error = { statusCode: response.status, message: 'An error occurred trying to fetch state info!' };
        return { props: { error } };
    }
}

export default StatePage;
