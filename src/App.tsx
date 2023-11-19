// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import MovieDetailsPage from './pages/MovieDetailsPage';

import Header from './components/Header';


const App: React.FC = () => {

  return (
    <div className='bg-custom-black min-h-screen text-white'>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/item/:id" element={<MovieDetailsPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;