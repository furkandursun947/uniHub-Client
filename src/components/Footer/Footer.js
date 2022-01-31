import React from 'react';

const Footer = () => {

    return (
        <div className="ui buttons" style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', width: '50%' }}>
                <a href="https://www.facebook.com/" className="ui facebook button">
                    <i className="facebook icon"></i>
                    Facebook
                </a>
                <a href="https://twitter.com/" className="ui twitter button">
                    <i className="twitter icon"></i>
                    Twitter
                </a>
                <a href="https://www.linkedin.com/" className="ui linkedin button">
                    <i className="linkedin icon"></i>
                    LinkedIn
                </a>
                <a href="https://www.instagram.com/" className="ui instagram button">
                    <i className="instagram icon"></i>
                    Instagram
                </a>
            </div>
        </div>
    );
};

export default Footer;