import Link from 'next/link';
import PropTypes from 'prop-types';

function StatePage({ state }) {
    return (
        <div>
            <h1>{state.state_name}</h1>
            <p>{state.abbrev}</p>
            <p>{state.capital}</p>
            <Link href="/">
                <a>← Home</a>
            </Link>
        </div>
    );
}

StatePage.propTypes = {
    state: PropTypes.object,
};

export async function getServerSideProps({ req, query }) {
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers['x-forwarded-host'] || req.headers.host;

    const res = await fetch(`${protocol}://${host}/api/states/${query.id}`);
    const data = await res.json();

    return { props: data };
}

export default StatePage;
