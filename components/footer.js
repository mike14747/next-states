const Footer = () => {
    return (
        <div id="footer">
            Copyright &#169; 2019 mike14747
            <style jsx>{`
                #footer {
                    width: 100%;
                    text-align: center;
                    border-top: 1px #999999 solid;
                    background-color: #e9e9e9;
                    padding: 1rem;
                    color: #333333;
                    font-size: 80%;
                    margin-right: auto;
                    margin-left: auto;
                }

                @media (min-width: 576px) {
                    #footer {
                        padding: 1.5rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default Footer;
