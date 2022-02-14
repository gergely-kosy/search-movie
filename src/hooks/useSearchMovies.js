import { gql, useLazyQuery } from "@apollo/client";

export const SEARCH_MOVIES_QUERY = gql`
  query SearchMovies($query: String!) {
    searchMovies(query: $query) {
      id
      name
      score
      overview
      releaseDate
      genres {
        name
      }
      similar {
        id
        name
        releaseDate
        genres {
          name
        }
        score
      }
    }
  }
`

export const useSearchMovies = (query) => {
  const [ searchMovies, { data, error, loading } ] = useLazyQuery(SEARCH_MOVIES_QUERY, {
    variables: {
      query
    }
  });

  return {
    searchMovies,
    data,
    error, 
    loading
  }
}