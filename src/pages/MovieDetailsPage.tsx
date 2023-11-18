// src/pages/MovieDetailsPage.tsx
import React from 'react';
import { useParams } from 'react-router-dom';

interface MovieDetailsPageParams {
  id: string;
  [key: string]: string | undefined;
}

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams<MovieDetailsPageParams>();

  return (
    <div>
      <h2>Movie Details Page</h2>
      <p>Movie ID: {id}</p>
      {/* Add your movie details components here */}
    </div>
  );
};

export default MovieDetailsPage;
