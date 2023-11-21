import React from 'react';
import TileGrid from '../components/TileGrid';

interface ToWatchPageProps {
  toWatchList: MediaSearchResult[];
  watchListActions: WatchListActions;
}

const ToWatchPage: React.FC<ToWatchPageProps> = ({ toWatchList, watchListActions }) => {
  const renderUi = () => {
    if (toWatchList.length === 0) {
      return <h1 className='text-3xl text-white'>You have nothing to watch</h1>
    }

    return (
      <TileGrid searchResults={toWatchList} watchListActions={watchListActions} />);
  };
  return (
    <div className='flex items-center justify-center flex-col'>
      {renderUi()}
    </div>
  );
};

export default ToWatchPage;