import React from 'react';
import { useNavigate } from 'react-router-dom';

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    baseLink: string;
}

const circularButton = 'rounded-full h-10 w-10 flex items-center justify-center '

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, baseLink }) => {
    const getPageLink = (pageNumber: number) => `${baseLink}&page=${pageNumber}`;
    const navigate = useNavigate();
    const handlePageClick = (pageNumber: number) => navigate(getPageLink(pageNumber));

    const renderPageLinks = () => {
        const maxPagesToShow = 5; // Adjust this based on your preference
        const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);
        const startPage = Math.max(currentPage - halfMaxPagesToShow, 1);
        const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

        const pageLinks = [];

        if (currentPage > halfMaxPagesToShow + 1) {
            pageLinks.push(
                <li key="first" className="arrow" onClick={() => handlePageClick(1)}>
                    <button className={`text-white ${circularButton} bg-custom-black-light text-white hover:ring-4 ring-cyan`}>
                        <i className="nf nf-md-arrow_expand_left" />
                    </button>
                </li>
            );
        }
        if (currentPage > 1) {
            pageLinks.push(
                <li key="prev" className="arrow" onClick={() => handlePageClick(currentPage - 1)}>
                    <button className={`text-white hover:ring-4 ring-cyan ${circularButton}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512" fill='currentColor'>
                            {/* <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --> */}
                            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" /></svg>
                    </button>
                </li>
            );
        }

        for (let i = startPage; i <= endPage; i++) {
            pageLinks.push(
                <li key={i} className={i === currentPage ? 'font-bold current-page bg-custom-black-light hover:ring-4 ring-cyan ' + circularButton : `hover:ring-4 ring-cyan ${circularButton}`}>
                    <button className='text-white' onClick={() => handlePageClick(i)}>{i}</button>
                </li>
            );
        }

        if (currentPage < totalPages) {
            pageLinks.push(
                <li key="next" className="arrow" onClick={() => handlePageClick(currentPage + 1)}>
                    <button className={`text-white hover:ring-4 ring-cyan ${circularButton}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512" fill='currentColor'>
                            {/* <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --> */}
                            <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                        </svg>
                    </button>
                </li>
            );
        }
        if (endPage < totalPages) {
            pageLinks.push(
                <li key="last" className="arrow" onClick={() => handlePageClick(totalPages)}>
                    <button className={`text-white ${circularButton} bg-custom-black-light hover:ring-4 ring-cyan`}>
                        <i className="nf nf-md-arrow_expand_right" />
                    </button>
                </li>
            );
        }

        return pageLinks;
    };

    return (
        <ul className="pagination flex items-center gap-2 my-2">
            {renderPageLinks()}
        </ul>
    );
};

export default Pagination;
