import React from 'react';
import TileGrid from '../components/TileGrid';

interface ToWatchPageProps {
  toWatchList: MediaSearchResult[];
  watchListActions: WatchListActions;
  setWatchListData: React.Dispatch<React.SetStateAction<WatchListData>>;
}

const ToWatchPage: React.FC<ToWatchPageProps> = ({ toWatchList, watchListActions, setWatchListData }) => {
  const renderUi = () => {
    if (toWatchList.length === 0) {
      return <h1 className='text-3xl text-white'>You have nothing to watch</h1>
    }

    return (
      <TileGrid searchResults={toWatchList} watchListActions={watchListActions} setWatchListData={setWatchListData} />);
  };
  return (
    <div className='flex items-center justify-center flex-col'>
      {renderUi()}
    </div>
  );
};

export default ToWatchPage;