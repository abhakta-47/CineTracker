// src/pages/SearchPage.tsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import TileGrid from '../components/TileGrid';
import Pagination from '../components/Pagination';
import SpinningLoader from '../components/SpinningLoader';
import SearchBox from '../components/SearchBox';

import { SearchMedia, MediaSearchResults } from '../utils/omdbApi';

const ITEMS_PER_PAGE = 10; // Adjust this based on your requirements

interface SearchPageProps {
  watchListActions: WatchListActions;
}

const SearchPage: React.FC<SearchPageProps> = ({ watchListActions }) => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<MediaSearchResult[]>([]);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setSearchQuery(searchParams.get('key') || '');
    setCurrentPage(searchParams.get('page') ? parseInt(searchParams.get('page') as string) : 1);
  }, [searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let results: MediaSearchResults = { results: [], totalResults: 0 };
      if (searchQuery && searchQuery.length >= 3) {
        results = await SearchMedia(searchQuery, currentPage);
        setSearchResults(results["results"]);
        setTotalResults(results["totalResults"]);
        setLoading(false);
      }
      else {
        setSearchResults([]);
        setTotalResults(0);
        setLoading(false);
      }
    };

    fetchData();
  }, [searchQuery, currentPage]);

  const renderUi = () => {
    if (searchQuery.length < 3)
      return (
        <p className='text-xl'>Please search for something in searchbox. Search query must be at least 3 characters long.</p>
      );

    if (loading) {
      return (
        <SpinningLoader />
      );
    }

    if (searchResults.length === 0)
      return (
        <p className='text-xl'>No results found</p>
      );

    return (<>
      <TileGrid searchResults={searchResults} watchListActions={watchListActions} />
      <div className="self-center">
        <Pagination
          totalPages={Math.ceil(totalResults / ITEMS_PER_PAGE)}
          currentPage={currentPage}
          baseLink={`/search?key=${searchQuery}`}
        />
      </div>
    </>);

  };

  return (
    <div className='flex items-center justify-center flex-col gap-2 p-4'>
      <div className="mb-4">
        < SearchBox />
      </div>
      {renderUi()}
    </div>
  );
};

export default SearchPage;
