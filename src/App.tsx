// src/App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import MovieDetailsPage from './pages/MovieDetailsPage';

import Header from './components/Header';
import { MediaSearchResult } from './utils/omdbApi';


const App: React.FC = () => {
  const [searchResults, setSearchResults] = useState<MediaSearchResult[]>([]);

  return (
    <>
      <Header searchBarCallback={setSearchResults} />
      <Router>
        <Routes>
          <Route path="/" element={<SearchPage searchResults={searchResults} setSearchResults={setSearchResults} />} />
          <Route path="/search" element={<SearchPage searchResults={searchResults} setSearchResults={setSearchResults} />} />
          <Route path="/search?key=:key" element={<SearchPage searchResults={searchResults} setSearchResults={setSearchResults} />} />
          <Route path="/item/:id" element={<MovieDetailsPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;