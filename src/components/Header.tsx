import React from 'react';
import { Link } from 'react-router-dom';

import Account from '../components/Account';


const Header = () => {

    return (
        <header className="p-4 flex items-center justify-between mb-4 gap-2" style={{ background: "rgba(15,19,23,.8)" }}>
            <Link to="/">
                <h1 className="text-white text-2xl font-bold">CINE TRACK</h1>
            </Link>
            <div className="grow"></div>
            <Link to="/towatch" className="text-white p-2 font-bold rounded-md" style={{ background: "#1db2f3", color: "#0f1317" }}>
                <p className=''>
                    toWatch
                </p>
            </Link>
            <Link to="/watched" className="text-white p-2 font-bold rounded-md" style={{ background: "#1db2f3", color: "#0f1317" }}>
                <p className=''>
                    Watched
                </p>
            </Link>

            <Account />

        </header >
    );
};

export default Header;
