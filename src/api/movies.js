const http = require("../services/httpService");

const getMovies = async (programOptions) => {
  let path = "movie/";
  if (programOptions.popular) path += "popular";
  if (programOptions.reviews) path += "reviews";

  const apiKey = process.env.THE_MOVIE_DB_API_KEY;
  const language = programOptions.language | "en-US";
  const page = programOptions.page | 1;

  try {
    return await http.get(`https://api.themoviedb.org/3/${path}`, {
      params: {
        api_key: apiKey,
        language: language,
        page: page
      }
    })
  } catch (error) {
    console.error(error)
  }
}

const getMovie = async (programOptions) => {
  const apiKey = process.env.THE_MOVIE_DB_API_KEY;
  const movieId = programOptions.id;
  const path = `movie/${movieId}`;
  const language = programOptions.language | "en-US";

  try {
    return await http.get(`https://api.themoviedb.org/3/${path}?api_key=${apiKey}&language=${language}`)
  } catch (error) {
    console.error(error)
  }
}

const getMovieReviews = async (programOptions) => {
  const apiKey = process.env.THE_MOVIE_DB_API_KEY;
  const movieId = programOptions.id;
  const path = `movie/${movieId}/reviews`;
  const language = programOptions.language | "en-US";
  const page = programOptions.page | 1;

  try {
    return await http.get(`https://api.themoviedb.org/3/${path}?api_key=${apiKey}&language=${language}&page=${page}`)
  } catch (error) {
    console.error(error)
  }
}

const moviesApi = {
  getMovies,
  getMovie,
  getMovieReviews,
};

module.exports = moviesApi;
