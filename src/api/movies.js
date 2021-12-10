const http = require("../services/httpService");
const dotenv = require("dotenv");

dotenv.config();

const getMovies = async () => {
  const apiKey = process.env.THE_MOVIE_DB_API_KEY;
  const page = 1;
  const path = "movie/popular";
  const language = "en-US";

  try {
    return await http.get(`https://api.themoviedb.org/3/${path}?api_key=${apiKey}&language=${language}&page=${page}`)
  } catch (error) {
    console.error(error)
  }
}

const getMovie = async (idMovie) => {
  const apiKey = process.env.THE_MOVIE_DB_API_KEY;
  const page = 1;
  const path = `movie/${idMovie}`;
  const language = "en-US";

  try {
    return await http.get(`https://api.themoviedb.org/3/${path}?api_key=${apiKey}&language=${language}&page=${page}`)
  } catch (error) {
    console.error(error)
  }
}

const moviesApi = {
  getMovies,
  getMovie,
};

module.exports = moviesApi;
