import { IMDB_API_WIKI_URL, IMDB_API_SEARCH_URL } from "../utils/constant";

export const fetchFromImdb = async (movieTitle) => {
    let url = IMDB_API_SEARCH_URL + movieTitle;

    return fetch(url)
    .then( response => response.json())
    .then(response => {
        console.log(response);
        if (response.results[0].title === movieTitle) {
            return response.results[0];
        }
        return null;
    })
    .catch(error => {
        console.log(error);
        return error;
    });
} 

export const fetchFromImdbWiki = async (movieID) => {
    let url = IMDB_API_WIKI_URL + movieID;
    console.log("wiki url", url);
    return fetch(url)
    .then( response => response.json())
    .then(response => {
        console.log(response);
        return response;
    })
    .catch(error => {
        console.log(error);
        return error;
    });
} 