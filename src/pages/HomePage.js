import React from 'react';
import { useSelector } from 'react-redux';
import { getScreenSize } from '../features/generalSlice';
import image from '../images/onlineeduc2.jpg';
import './styles/homepage.css';

const HomePage = () => {


    const size = useSelector(getScreenSize);

    return (
        <div style={{ marginTop: size < 500 ? -10 : -50, position: 'relative' }}>
            <div className="homeInfo">
                <span style={{ fontSize: (size * 2.9 / 100) + 20 }}>
                    UniHub
                </span>
                <p style={{ fontSize: (size / 100) + 10 }}>
                    Redesign of University
                </p>
            </div>
            <div className="home__image">
                <img
                    src={image}
                    alt="banner"
                    className="home__image banner_image"
                />
            </div>
        </div>

    );
}

export default HomePage

