import React, { useState } from 'react'
import { IMDB_URL_PAGE } from "../../../utils/constant";
import { fetchFromImdb, fetchFromImdbWiki } from "../../../api/API";

import { Accordion, AccordionSummary, AccordionDetails } from "@material-ui/core";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typography } from '@mui/material';

import MovieRowDetails from "../MovieRowDetails";
import "./MovieRow.css";

const MovieRow = ({ movie, triggerSearch }) => {
  const [wikiURL, setWikiURL] = useState("");
  const [imdbURL, setImdbURL] = useState("");
  const [plotShort, setPlotShort] = useState("");
  const [fetched, setFetched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    if (isExpanded) getMovieDetails();
  };

  const getMovieDetails = async () => {
    let wikiData;
    
    if (!fetched) {
      setLoading(true);

      const imdbData = await fetchFromImdb(movie.name);
  
      if (imdbData) {
        if (!imdbData.errorMessage) {
          setImdbURL(IMDB_URL_PAGE + imdbData.id);
        
          wikiData = await fetchFromImdbWiki(imdbData.id);
          if (wikiData) {
            setWikiURL(wikiData.url);
            createShortPlot(wikiData.plotShort?.html);
          }
        }
      }

      setLoading(false);
      setFetched(true);
    }
  }

  const createShortPlot = (plot) => {
    const index = plot.search("</p>");
    const finalPlot = plot.substring(0, index).replace("<p>", "");

    setPlotShort(finalPlot);
  }

  const createGenres = () => {
    let finalGenres = "";

    movie.genres?.forEach(genre => {
      finalGenres += genre.name  + ", ";
    });

    return finalGenres.substring(0, finalGenres.length - 2);
  }

  return <>
    <Accordion
      TransitionProps={{ unmountOnExit: true }}
      onChange={handleChange()}>
      <AccordionSummary
        className="movieHeaderContainer"
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography className="movieName" sx={{ flexShrink: 0 }}>
          {movie.name}
        </Typography>
        <Typography className="movieGenres" sx={{ color: 'text.secondary' }}>
          {createGenres()}
        </Typography>
        <Typography sx={{ flex: '1', color: 'text.secondary', textAlign: 'center' }}>
          {movie.score}
        </Typography>
      </AccordionSummary>
      <AccordionDetails id="movieDetailsContainer">
        <MovieRowDetails
          similarMovies={movie.similar}
          triggerSearch={triggerSearch}
          loading={loading}
          plotShort={plotShort}
          wikiURL={wikiURL}
          imdbURL={imdbURL} />
      </AccordionDetails>
    </Accordion>
  </>
}

export default MovieRow;