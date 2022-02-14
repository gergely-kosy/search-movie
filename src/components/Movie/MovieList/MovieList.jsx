import React, { useEffect, useState } from 'react';

import { Box, CircularProgress } from '@mui/material';

import MovieRow from "../MovieRow";
import "./MovieList.css";

const MovieList = ({ data, loading }) => {

  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    setMovieList(data?.searchMovies);
  }, [data]);

  const triggerSearch = (movieList) => {
    setMovieList(movieList);
  }

  return <Box className="movieList">
    {loading ? <CircularProgress /> : 
    (movieList?.length > 0 ? Object.values(movieList).map((movie, index) => {
      return <Box className="movieRowContainer" key={index}>
          <MovieRow triggerSearch={triggerSearch} movie={movie} />
        </Box>
    }) : <p>No results</p>)
    }
</Box>
}

export default MovieList;