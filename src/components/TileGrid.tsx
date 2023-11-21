// src/components/TileGrid.tsx
import React from 'react';
import Tile from './Tile';


interface TileGridProps {
    searchResults: MediaSearchResult[];
    watchListActions: WatchListActions;
    setWatchListData: React.Dispatch<React.SetStateAction<WatchListData>>;
}

const TileGrid: React.FC<TileGridProps> = ({ searchResults, watchListActions, setWatchListData }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {searchResults.map((searchResult) => (
                <Tile
                    key={searchResult.id}
                    searchResult={searchResult} // Pass the searchResult as the movie prop
                    addToWatchList={watchListActions.addToWatchList}
                    addWatchedList={watchListActions.addWatchedList}
                    removeToWatchList={watchListActions.removeToWatchList}
                    removeWatchedList={watchListActions.removeWatchedList}
                    setWatchListData={setWatchListData}
                />
            ))}
        </div>
    );
};

export default TileGrid;
