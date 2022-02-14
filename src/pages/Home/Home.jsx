import React, { useState } from "react";
import { useSearchMovies } from "../../hooks/useSearchMovies";

import { TextField, Button, Box } from "@material-ui/core";

import MovieList from "../../components/Movie/MovieList";
import "./Home.css";

const Home = () => {

  const { searchMovies, error, loading, data } = useSearchMovies("");
  const [ movie, setMovie ] = useState("");
  
  if (error) return <h1>Error found</h1>;

  const hitEnter = (e) => {
    if (e.key === "Enter") document.getElementById('searchButton').click();
  }

  return <Box>
    <Box id="searchBox">
      <TextField
        value={movie} 
        onChange={(e) => setMovie(e.target.value)} 
        type="text" 
        className="searchField"
        id="standard-basic searchField"
        onKeyDown={(e) => hitEnter(e)}
        label="Movie title"
        variant="standard" />
      <Button 
        id="searchButton"
        onClick={() => searchMovies({ variables: {query: movie} })}
        variant="outlined">
        Search
      </Button>
    </Box>
    <MovieList loading={loading} data={data} />
  </Box>
}

export default Home;