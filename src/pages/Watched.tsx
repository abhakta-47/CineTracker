import React from 'react';
import TileGrid from '../components/TileGrid';

interface ToWatchPageProps {
  watchedList: MediaSearchResult[];
  watchListActions: WatchListActions;
  setWatchListData: React.Dispatch<React.SetStateAction<WatchListData>>;
}

const ToWatchPage: React.FC<ToWatchPageProps> = ({ watchedList, watchListActions, setWatchListData }) => {
  const renderUi = () => {
    if (watchedList.length === 0) {
      return <h1 className='text-3xl text-white'>Nothing added as watched</h1>
    }

    return (
      <TileGrid searchResults={watchedList} watchListActions={watchListActions} setWatchListData={setWatchListData} />);
  };
  return (
    <div className='flex items-center justify-center flex-col'>
      {renderUi()}
    </div>
  );
};

export default ToWatchPage;