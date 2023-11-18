// src/pages/SearchPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TileGrid from '../components/TileGrid';
import { SearchMedia, MediaDetails, MediaSearchResult } from '../utils/omdbApi';

interface SearchPageParams {
  key?: string;
  [key: string]: string | undefined;
}

const SearchPage: React.FC<any> = ({ searchResults, setSearchResults }) => {
  const { key } = useParams<SearchPageParams>();
  const [searchQuery, setSearchQuery] = useState<string>(key || '');
  const navigate = useNavigate();

  useEffect(() => {

    const delayDebounceFn = setTimeout(() => {
      // Send Axios request here
      if (searchQuery.trim().length >= 3) {
        fetchData();
      }
    }, 2000)

    return () => clearTimeout(delayDebounceFn)

  }, [searchQuery]);

  const handleSearch = () => {
    if (searchQuery.trim().length >= 3) {
      setSearchResults([]);
      fetchData();
    }
  };

  const fetchData = async () => {
    const results = await SearchMedia(searchQuery);
    setSearchResults(results);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim().length >= 3) {
      handleSearch();
    }
  };

  return (
    <div className='flex items-center justify-center'>
      {key && <p>Search keyword: {key}</p>}
      <TileGrid
        searchResults={searchResults}
      />
      {/* Add your search results and components here */}
    </div>
  );
};

export default SearchPage;
