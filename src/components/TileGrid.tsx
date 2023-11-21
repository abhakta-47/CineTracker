// src/components/TileGrid.tsx
import React from 'react';
import Tile from './Tile';
import { MediaSearchResult } from '../utils/omdbApi';


interface TileGridProps {
    searchResults: MediaSearchResult[];
    watchListActions: WatchListActions;
}

const TileGrid: React.FC<TileGridProps> = ({ searchResults, watchListActions }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {searchResults.map((searchResult) => (
                <Tile
                    key={searchResult.id}
                    searchResult={searchResult} // Pass the searchResult as the movie prop
                    onAddToWatchList={watchListActions.addToWatchList}
                    onAddToWatchedList={watchListActions.addWatchedList}
                />
            ))}
        </div>
    );
};

export default TileGrid;
