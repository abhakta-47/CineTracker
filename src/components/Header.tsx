import React from 'react';
import SearchBox from '../components/SearchBox';


const Header = () => {
    return (
        <header className="p-4 flex items-center justify-between mb-4" style={{ background: "rgba(15,19,23,.8)" }}>
            <a href="/">
                <h1 className="text-white text-2xl font-bold">CINE TRACK</h1>
            </a>
            <div className="flex">
                < SearchBox />
            </div>
        </header >
    );
};

export default Header;
