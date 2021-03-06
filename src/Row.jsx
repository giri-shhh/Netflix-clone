import React, { useState, useEffect } from 'react';
import axios from './axios';
import './Row.css';

const BASE_URL = 'https://image.tmdb.org/t/p/original/';

const Row = ({ title, fetchUrl, isLargePoster }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      const request = await axios
        .get(fetchUrl)
        .then((response) => {
          setMovies(response.data.results);
        })
        .catch((err) => console.log(err));
      return request;
    }

    fetchMovies();
  }, [fetchUrl]);

  return (
    <div className='row'>
      <h2 className='row__title'>{title}</h2>
      <div className='row__posters'>
        {movies.map((movie) => (
          <img
            key={movie.id}
            className={`row__poster ${isLargePoster && 'row__poster__large'}`}
            src={`${BASE_URL}${
              isLargePoster ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
    </div>
  );
};

export default Row;
