// src/components/Tile.tsx
import React, { useState, useEffect } from 'react';
import { Tooltip } from 'react-tooltip';

import { OMDBMedia, MediaDetails } from "../utils/omdbApi"


const TileLoader = () => {
    return (
        <div className="bg-gray-200 p-4 rounded-md shadow-md animate-pulse" style={{ height: "444px", width: "300px" }}>
            {/* Card content goes here */}
        </div>
    );
};

interface TileProps {
    searchResult: MediaSearchResult;
    watchListActions: WatchListActions;
}

const Tile: React.FC<TileProps> = ({ searchResult, watchListActions }) => {
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
        watchListActions.addToWatchList(searchResult.id);
    };
    const handleAddWatched = (e: React.MouseEvent<HTMLButtonElement>) => {
        // e.preventDefault();
        console.log("add to watchedlist");
        watchListActions.addWatchedList(searchResult.id);
    };
    const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
        // e.preventDefault();
        const path = window.location.pathname;
        if ('/watched' === path)
            watchListActions.removeWatchedList(searchResult.id);
        else if ('/towatch' === path)
            watchListActions.removeToWatchList(searchResult.id);
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
