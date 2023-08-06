/* eslint-disable import/prefer-default-export */
/**
 * IN REAL WORLD PROJECT, THERE WILL BE DIFFERENT ENV LIKE QA, STAGE, AND, PROD
 * THAT CAN BE CONFIGURED INSIDE ENV
 */
const BASE_URL = 'https://api.themoviedb.org';

/**
 * IN REAL WORLD PROJECT, ENV WILL NEVER BE EXPOSED DIRECTLY, IT WILL ALWAYS BE FETCHED FROM THE ENV
 */
const TOKEN =
  import.meta.env.VITE_API_TOKEN ||
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZmVlNmQ3YmY3NmM4ZDA3NDhhZWM2OGEyNDg0ZjE0NCIsInN1YiI6IjViYzFkNzk0YzNhMzY4MmQ0YjAzMGZhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RIoOQlnWOMt2vRUkIOl5GaIGxgLsFEMGWhYxGq9OX04';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TOKEN}`,
  },
};

const getMoviesByName = async (query: string) => {
  const url = `${BASE_URL}/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;
  const results = await fetch(url, options);
  const data = await results.json();
  return data;
};

const fetchMovies = async (query: string) => {
  try {
    const { results } = await getMoviesByName(query);
    return results;
  } catch (error) {
    return [];
  }
};
const MoviesApi = {
  fetchMovies,
};

export default MoviesApi;
