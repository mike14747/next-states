import PropTypes from 'prop-types';

import Header from '../components/header';
import Footer from '../components/footer';

import '../css/my_style.css';
import '../css/styles.css';

function MyApp({ Component, pageProps }) {
    return (
        <div id="app-wrapper">
            <Header />
            <div id="main-container">
                <Component {...pageProps} />
            </div>
            <Footer />
            <style jsx>{`
                #app-wrapper {
                    display: flex;
                    flex-direction: column;
                    min-height: 100vh;
                }
                
                #main-container {
                    flex: 1;
                }
            `}</style>
        </div>
    );
}

MyApp.propTypes = {
    Component: PropTypes.func,
    pageProps: PropTypes.any,
};

export default MyApp;
