// src/components/TileGrid.tsx
import React from 'react';
import Tile from './Tile';


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
                    watchListActions={watchListActions}
                />
            ))}
        </div>
    );
};

export default TileGrid;
