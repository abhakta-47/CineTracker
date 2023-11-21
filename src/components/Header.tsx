import React, { useState } from 'react';
import SearchBox from '../components/SearchBox';

import gDriveService from '../services/gdrive';


const Header = () => {
    const [gapiLoaded, setGapiLoaded] = useState(false);
    document.addEventListener('gapiLoaded', () => {
        setGapiLoaded(true);
    });

    return (
        <header className="p-4 flex items-center justify-between mb-4 gap-2" style={{ background: "rgba(15,19,23,.8)" }}>
            <a href="/">
                <h1 className="text-white text-2xl font-bold">CINE TRACK</h1>
            </a>
            <div className="grow"></div>
            <a href="/towatch" className="text-white p-2 font-bold rounded-md" style={{ background: "#1db2f3", color: "#0f1317" }}>
                <p className=''>
                    toWatch
                </p>
            </a>
            <a href="/watched" className="text-white p-2 font-bold rounded-md" style={{ background: "#1db2f3", color: "#0f1317" }}>
                <p className=''>
                    Watched
                </p>
            </a>
            <div className="flex">
                < SearchBox />
            </div>
            {gapiLoaded &&
                < button onClick={gDriveService.authLogin} className='mx-2 text-3xl' style={{ color: "#1db2f3" }}>
                    <i className="nf nf-md-account_circle"></i>
                </button>
            }
        </header >
    );
};

export default Header;
