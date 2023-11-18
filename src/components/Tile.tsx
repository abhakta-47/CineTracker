// src/components/Tile.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
    }, []);

    return (
        <div className="bg-gray-100 p-4 rounded-md">
            {media ? (
                <>
                    <img src={media["Poster"]} alt={media["Title"]} className="w-full h-40 object-cover mb-2 rounded-md" />
                    <h3 className="text-lg font-bold">{media["Title"]}</h3>
                    <p className="text-gray-600 mb-2">{media["Plot"]}</p>
                    <p className="text-yellow-500 mb-2">Rating: {media["imdbRating"]}</p>

                    <div className="flex space-x-2">
                        <Link to={`/item/omdb/${media["imdbID"]}`} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                            View Details
                        </Link>
                        <button onClick={onAddToWatchList} className="bg-green-500 text-white px-4 py-2 rounded-md">
                            Add to Watchlist
                        </button>
                        <button onClick={onAddToWatchedList} className="bg-indigo-500 text-white px-4 py-2 rounded-md">
                            Add to Watched List
                        </button>
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Tile;
