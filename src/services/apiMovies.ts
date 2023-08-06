/* eslint-disable import/prefer-default-export */
/**
 * IN REAL WORLD PROJECT, THERE WILL BE DIFFERENT ENV LIKE QA, STAGE, AND, PROD
 * THAT CAN BE CONFIGURED INSIDE ENV
 */
const BASE_URL = 'https://api.themoviedb.org';

const TOKEN = import.meta.env.VITE_API_TOKEN;

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
