import React from 'react';
import TileGrid from '../components/TileGrid';

interface ToWatchPageProps {
  watchedList: MediaSearchResult[];
  watchListActions: WatchListActions;
}

const ToWatchPage: React.FC<ToWatchPageProps> = ({ watchedList, watchListActions }) => {
  const renderUi = () => {
    if (watchedList.length === 0) {
      return <h1 className='text-3xl text-white'>Nothing added as watched</h1>
    }

    return (
      <TileGrid searchResults={watchedList} watchListActions={watchListActions} />);
  };
  return (
    <div className='flex items-center justify-center flex-col'>
      {renderUi()}
    </div>
  );
};

export default ToWatchPage;