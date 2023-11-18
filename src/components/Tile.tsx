// src/components/Tile.tsx
import React, { useState, useEffect } from 'react';

import { MediaSearchResult, OMDBMedia, MediaDetails } from "../utils/omdbApi"

interface TileProps {
    searchResult: MediaSearchResult;
    onAddToWatchList: () => void;
    onAddToWatchedList: () => void;
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

                        {/* <div className="flex space-x-2">
                            <Link to={`/item/omdb/${media["imdbID"]}`} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                                View Details
                            </Link>
                            <button onClick={onAddToWatchList} className="bg-green-500 text-white px-4 py-2 rounded-md">
                                Add to Watchlist
                            </button>
                            <button onClick={onAddToWatchedList} className="bg-indigo-500 text-white px-4 py-2 rounded-md">
                                Add to Watched List
                            </button>
                        </div> */}
                    </div>
                </ div>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
};

export default Tile;
