import { Box, Link, Button, CircularProgress } from '@mui/material';
import "./MovieRowDetails.css";

const MovieRowDetails = ({ similarMovies, loading, plotShort, wikiURL, imdbURL, triggerSearch }) => {
  return (
    <Box className="movieDetailsBox">
      {loading ? <CircularProgress /> : 
        <Box className="movieDetails">
          <Box sx={{ color: 'text.secondary' }} className="detailsLeftSide">{plotShort}</Box>
          <Box className="detailsRightSide">
            <Box className="movieLinks">
              {wikiURL ?
              <Link rel="noreferrer" href={wikiURL} target="_blank" underline="always">
                {'Wikipedia'}
              </Link> : "Wiki: -"}
              {imdbURL ?
              <Link rel="noreferrer" href={imdbURL} target="_blank" underline="always">
                {'IMDB'}
              </Link> : "IMDB: -"}
            </Box>
            <Button variant="outlined" onClick={() => triggerSearch(similarMovies)}>
              Related Movies
            </Button>
          </Box>
        </Box>
      }
    </Box>
  )
}

export default MovieRowDetails;