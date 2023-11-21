// src/components/Tile.tsx
import React, { useState, useEffect } from 'react';
import { Tooltip } from 'react-tooltip';

import { OMDBMedia, MediaDetails } from "../utils/omdbApi"
import watchListService from '../services/storage';


const TileLoader = () => {
    return (
        <div className="bg-gray-200 p-4 rounded-md shadow-md animate-pulse" style={{ height: "444px", width: "300px" }}>
            {/* Card content goes here */}
        </div>
    );
};

interface TileProps {
    searchResult: MediaSearchResult;
    addToWatchList: (id: string) => void;
    addWatchedList: (id: string) => void;
    removeToWatchList: (id: string) => void;
    removeWatchedList: (id: string) => void;
    setWatchListData: React.Dispatch<React.SetStateAction<WatchListData>>;
}

const Tile: React.FC<TileProps> = ({ searchResult, addToWatchList, addWatchedList, removeToWatchList, removeWatchedList, setWatchListData }) => {
    const [media, setMedia] = useState<OMDBMedia | undefined>();

    useEffect(() => {
        const fetchData = async () => {
            const result = await MediaDetails(searchResult.id);
            if (result != null)
                setMedia(result);
        };

        fetchData();
    }, [searchResult]);

    const handleAddToWatch = (e: React.MouseEvent<HTMLButtonElement>) => {
        // e.preventDefault();
        console.log("add to watchlist");
        removeWatchedList(searchResult.id);
        addToWatchList(searchResult.id);
        setWatchListData(watchListService.getWatchLists());
    };
    const handleAddWatched = (e: React.MouseEvent<HTMLButtonElement>) => {
        // e.preventDefault();
        console.log("add to watchedlist");
        removeToWatchList(searchResult.id);
        addWatchedList(searchResult.id);
        setWatchListData(watchListService.getWatchLists());
    };
    const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
        // e.preventDefault();
        const path = window.location.pathname;
        if ('/watched' === path)
            removeWatchedList(searchResult.id);
        else
            removeToWatchList(searchResult.id);
        setWatchListData(watchListService.getWatchLists());
    };

    return (
        <>
            {media ? (
                <div className='relative rounded-md overflow-hidden tile-container w-fit' style={{ height: "444px", width: "300px" }} >
                    <a target='blank' href={"https://www.imdb.com/title/" + media["imdbID"]} className='relative block h-full w-full'>
                        <img className='tile-poster' src={media["Poster"]} alt={media["Title"]} />
                        <div className="overlay"></div>
                    </a>

                    <div className="details tile-details">
                        <h3 className="text-lg text-white font-bold">{media["Title"]}</h3>
                        {/* <p className="text-white mb-2">{media["Plot"]}</p> */}
                        <p className="text-white mb-2">Rating: {media["imdbRating"]}</p>


                        <div className="flex justify-around space-x-2">
                            <button
                                data-tooltip-id={`my-tooltip-${media["imdbID"]}`}
                                data-tooltip-content="Add to Watch list"
                                onClick={handleAddToWatch}
                                className="bg-green-500 text-white px-4 py-2 rounded-md z-10"
                            >
                                <i className="nf nf-md-eye_plus"></i>
                            </button>
                            <button
                                data-tooltip-id={`my-tooltip-${media["imdbID"]}`}
                                data-tooltip-content="mark already Watched"
                                onClick={handleAddWatched}
                                className="bg-indigo-500 text-white px-4 py-2 rounded-md z-10"
                            >
                                <i className="nf nf-md-eye_check"></i>
                            </button>
                            <button
                                data-tooltip-id={`my-tooltip-${media["imdbID"]}`}
                                data-tooltip-content="delete from list"
                                onClick={handleRemove}
                                className="bg-red-500 text-white px-4 py-2 rounded-md z-10"
                            >
                                <i className="nf nf-fa-trash"></i>
                            </button>
                            <Tooltip id={`my-tooltip-${media["imdbID"]}`} />
                        </div>

                    </div>
                </ div>
            ) : (
                <TileLoader />
            )}
        </>
    );
};

export default Tile;
