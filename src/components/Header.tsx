import React from 'react';
import SearchBox from '../components/SearchBox';
import { MediaSearchResult } from '../utils/omdbApi';


const Header = () => {
    return (
        <header className="bg-shark p-4 flex items-center justify-between mb-4">
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
