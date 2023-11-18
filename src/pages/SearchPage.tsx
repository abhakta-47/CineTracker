// src/pages/SearchPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TileGrid from '../components/TileGrid';
import { SearchMedia, MediaDetails, MediaSearchResult } from '../utils/omdbApi';

interface SearchPageParams {
  key?: string;
  [key: string]: string | undefined;
}

const SearchPage: React.FC = () => {
  const { key } = useParams<SearchPageParams>();
  const [searchQuery, setSearchQuery] = useState<string>(key || '');
  const [searchResults, setSearchResults] = useState<MediaSearchResult[]>([]);
  const navigate = useNavigate();

  useEffect(() => {

    const fetchData = async () => {
      const results = await SearchMedia(searchQuery);
      setSearchResults(results);
    };

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
    <div>
      <h2>Search Page</h2>
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded-md"
          onKeyUp={handleKeyPress}
        />
        <button onClick={handleSearch} className="ml-2 bg-blue-500 text-white p-2 rounded-md">
          Search
        </button>
      </div>
      {key && <p>Search keyword: {key}</p>}
      <TileGrid
        searchResults={searchResults}
      />
      {/* Add your search results and components here */}
    </div>
  );
};

export default SearchPage;
