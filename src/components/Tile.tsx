// src/components/Tile.tsx
import React, { useState, useEffect } from 'react';
import { Tooltip } from 'react-tooltip';

import { MediaSearchResult, OMDBMedia, MediaDetails } from "../utils/omdbApi"

const TileLoader = () => {
    return (
        <div className="bg-gray-200 p-4 rounded-md shadow-md animate-pulse" style={{ height: "444px", width: "300px" }}>
            {/* Card content goes here */}
        </div>
    );
};

interface TileProps {
    searchResult: MediaSearchResult;
    onAddToWatchList: (id: string) => void;
    onAddToWatchedList: (id: string) => void;
}

const Tile: React.FC<TileProps> = ({ searchResult, onAddToWatchList, onAddToWatchedList }) => {
    const [media, setMedia] = useState<OMDBMedia | undefined>();

    useEffect(() => {
        const fetchData = async () => {
            const result = await MediaDetails(searchResult.id);
            if (result != null)
                setMedia(result);
        };

        fetchData()
    }, [searchResult]);

    const handleAddToWatch = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log("add to watchlist");
        onAddToWatchList(searchResult.id);
    };
    const handleAddWatched = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log("add to watchedlist");
        onAddToWatchedList(searchResult.id);
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


                        <div className="flex space-x-2">
                            <button
                                data-tooltip-id={`my-tooltip-${media["imdbID"]}`}
                                data-tooltip-content="Add item to Watch list"
                                onClick={handleAddToWatch}
                                className="bg-green-500 text-white px-4 py-2 rounded-md z-10"
                            >
                                <i className="nf nf-md-eye_plus"></i>
                            </button>
                            <div className=""></div>
                            <button
                                data-tooltip-id={`my-tooltip-${media["imdbID"]}`}
                                data-tooltip-content="mark as already Watched"
                                onClick={handleAddWatched}
                                className="bg-indigo-500 text-white px-4 py-2 rounded-md z-10"
                            >
                                <i className="nf nf-md-eye_check_outline"></i>
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
