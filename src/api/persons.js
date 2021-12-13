const http = require("../services/httpService");
const dotenv = require("dotenv");

dotenv.config();

const getPersons = async (programOptions) => {
  let path = "person/";
  if (programOptions.popular) path += "popular";

  const apiKey = process.env.THE_MOVIE_DB_API_KEY;
  const language = "en-US";
  const page = programOptions.page | 1;

  try {
    return await http.get(`https://api.themoviedb.org/3/${path}?api_key=${apiKey}&language=${language}&page=${page}`)
  } catch (error) {
    console.error(error)
  }
}

const getPerson = async (idPerson) => {
  const path = `person/${idPerson}`;
  const apiKey = process.env.THE_MOVIE_DB_API_KEY;
  const language = "en-US";

  try {
    return await http.get(`https://api.themoviedb.org/3/${path}?api_key=${apiKey}&language=${language}`)
  } catch (error) {
    console.error(error)
  }
}

const personsApi = {
  getPersons,
  getPerson,
};

module.exports = personsApi;

