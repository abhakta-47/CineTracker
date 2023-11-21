// src/App.tsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import watchListService from './services/storage';

import SearchPage from './pages/SearchPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import Header from './components/Header';
import ToWatchPage from './pages/ToWatch';
import WatchedPage from './pages/Watched';

declare global {
  interface WatchListActions {
    addToWatchList: (id: string) => void;
    addWatchedList: (id: string) => void;
    removeToWatchList: (id: string) => void;
    removeWatchedList: (id: string) => void;
  }
}

const App: React.FC = () => {
  const [watchListData, setWatchListData] = useState<WatchListData>(watchListService.getWatchLists());
  const [toWatchList, setToWatchList] = useState<MediaSearchResult[]>([]);
  const [watchedList, setWatchedList] = useState<MediaSearchResult[]>([]);

  useEffect(() => {
    setToWatchList(watchListData.toWatch.map(obj => { return { 'id': obj, 'type': "omdb" } }));
    setWatchedList(watchListData.watched.map(obj => { return { 'id': obj, 'type': "omdb" } }));
  }, [watchListData]);


  const watchListActions: WatchListActions = {
    addToWatchList: (id) => {
      watchListService.addToWatchList(id);
      setWatchListData(watchListService.getWatchLists());
    },
    addWatchedList: (id) => {
      watchListService.addWatchedList(id);
      setWatchListData(watchListService.getWatchLists());
    },
    removeToWatchList: (id) => {
      watchListService.removeToWatchList(id);
      setWatchListData(watchListService.getWatchLists());
    },
    removeWatchedList: (id) => {
      watchListService.removeWatchedList(id);
      setWatchListData(watchListService.getWatchLists());
    },
  };


  document.addEventListener('authComplete', () => {
    watchListService.postAuth();
  });


  return (
    <div className='bg-custom-black min-h-screen text-white'>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<SearchPage watchListActions={watchListActions} setWatchListData={setWatchListData} />} />
          <Route path="/search" element={<SearchPage watchListActions={watchListActions} setWatchListData={setWatchListData} />} />
          <Route path="/item/:id" element={<MovieDetailsPage />} />
          <Route path="/towatch" element={<ToWatchPage toWatchList={toWatchList} watchListActions={watchListActions} setWatchListData={setWatchListData} />} />
          <Route path="/watched" element={<WatchedPage watchedList={watchedList} watchListActions={watchListActions} setWatchListData={setWatchListData} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;