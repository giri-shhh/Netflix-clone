import React, { useState, useEffect } from 'react';
import axios from './axios';
import './Banner.css';
import requests from './requests';

const Banner = () => {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchBannerImage() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      const movie =
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ];
      setMovie(movie);
      return request;
    }
    fetchBannerImage();
  }, []);

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  };

  return (
    <header
      className='banner'
      style={{
        backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie?.backdrop_path}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }}
    >
      <div className='banner__contents'>
        <h1 className='banner__title'>
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <button className='banner__button'>Play</button>
        <button className='banner__button'>My List</button>
        <h1 className='banner__description'>
          {truncate(movie?.overview, 200)}
        </h1>
      </div>
      <div className='fade__bottom' />
    </header>
  );
};

export default Banner;
