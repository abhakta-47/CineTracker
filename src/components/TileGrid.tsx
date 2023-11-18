// src/components/TileGrid.tsx
import React from 'react';
import Tile from './Tile';
import { MediaSearchResult } from '../utils/omdbApi';


interface TileGridProps {
    searchResults: MediaSearchResult[];
}

const TileGrid: React.FC<TileGridProps> = ({ searchResults }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {searchResults.map((searchResult) => (
                <Tile
                    key={searchResult.id}
                    searchResult={searchResult} // Pass the searchResult as the movie prop
                    onAddToWatchList={() => { }}
                    onAddToWatchedList={() => { }}
                />
            ))}
        </div>
    );
};

export default TileGrid;
