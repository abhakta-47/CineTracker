// src/pages/SearchPage.tsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import TileGrid from '../components/TileGrid';

import { SearchMedia, MediaSearchResult } from '../utils/omdbApi';

const SearchPage = () => {
  const [searchParams,] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<MediaSearchResult[]>([]);

  useEffect(() => {
    const key = searchParams.get('key') || '';
    setSearchQuery(key);
  }, [searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      let results: MediaSearchResult[] = [];
      if (searchQuery && searchQuery.length >= 3)
        results = await SearchMedia(searchQuery);
      setSearchResults(results);
    };

    fetchData();
  }, [searchQuery]);

  return (
    <div className='flex items-center justify-center'>
      <TileGrid
        searchResults={searchResults}
      />
      {/* Add your search results and components here */}
    </div>
  );
};

export default SearchPage;
