import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';


const SearchBox = () => {

    const [searchQuery, setSearchQuery] = useState<string>("")
    const navigate = useNavigate();
    const [searchParams,] = useSearchParams();

    useEffect(() => {
        const key = searchParams.get('key') || '';
        setSearchQuery(key);
    }, [searchParams]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchQuery.trim().length >= 3) {
                navigate(`/search?key=${searchQuery}`);

            }
        }, 2000)

        return () => clearTimeout(delayDebounceFn)

    }, [searchQuery, navigate]);

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && searchQuery.trim().length >= 3) {
            navigate(`/search?key=${searchQuery}`);
        }
    };

    return (
        <div className="flex items-center rounded overflow-hidden">
            <div className="p-2 bg-white">
                {/* Search icon */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-5-5m2.01-6.293A7.965 7.965 0 0 0 18 10c0-4.418-3.582-8-8-8s-8 3.582-8 8 3.582 8 8 8a7.965 7.965 0 0 0 4.707-1.537"
                    />
                </svg>
            </div>
            <input
                type="text"
                placeholder="Search..."
                className="p-2 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyUp={handleKeyPress}

            />
            <button className="bg-blue-500 text-white p-2 ">
                {/* Search button */}
                Search
            </button>
        </div>
    );
};

export default SearchBox;
