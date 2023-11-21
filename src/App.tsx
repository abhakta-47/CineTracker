// src/App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import watchListService, { WatchListData } from './services/storage';
import gDriveService from './services/gdrive';

import SearchPage from './pages/SearchPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import Header from './components/Header';

declare global {
  interface WatchListActions {
    addToWatchList: (id: string) => void;
    addWatchedList: (id: string) => void;
    removeToWatchList: (id: string) => void;
    removeWatchedList: (id: string) => void;
  }
}

const App: React.FC = () => {
  const [watchListData, setWatchListData] = useState<WatchListData>();


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
      <button onClick={gDriveService.authLogin}>test</button>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<SearchPage watchListActions={watchListActions} />} />
          <Route path="/search" element={<SearchPage watchListActions={watchListActions} />} />
          <Route path="/item/:id" element={<MovieDetailsPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;