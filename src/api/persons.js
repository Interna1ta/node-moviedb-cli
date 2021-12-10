const http = require("../services/httpService");
const dotenv = require("dotenv");

dotenv.config();

const getPersons = async (pathName, pageType, pageNumber = 1, popular) => {
  const apiKey = process.env.THE_MOVIE_DB_API_KEY;
  // const page = 1;
  const path = "person/popular";
  const language = "en-US";

  try {
    return await http.get(`https://api.themoviedb.org/3/${path}?api_key=${apiKey}&language=${language}&page=${pageNumber}`)
  } catch (error) {
    console.error(error)
  }
}

const getPerson = async (idPerson) => {
  const apiKey = process.env.THE_MOVIE_DB_API_KEY;
  const page = 1;
  const path = `person/${idPerson}`;
  const language = "en-US";

  try {
    return await http.get(`https://api.themoviedb.org/3/${path}?api_key=${apiKey}&language=${language}&page=${page}`)
  } catch (error) {
    console.error(error)
  }
}

const personsApi = {
  getPersons,
  getPerson,
};

module.exports = personsApi;

