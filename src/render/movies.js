const chalk = require("chalk");

const renderMoviesData = async (data) => {
  const { page, total_pages, results: movies } = data;

  let string = `${chalk.white('\n----------------------------------------')}\n\n`;
  string += `Page: ${chalk.white(`${page} of ${total_pages}:`)}\n`;

  movies.forEach(movie => {
    string += `${chalk.white('\n----------------------------------------')}\n\n`;
    string += `${chalk.white('Movie:')}\n\n`;
    string += `ID: ${chalk.white(`${movie.id}`)}\n`;
    if (movie.title) string += `Title: ${chalk.bold.blue(`${movie.title}`)}\n`;
    if (movie.original_name) string += `Title: ${chalk.bold.blue(`${movie.original_name}`)}\n`;
    string += `Release Date: ${chalk.white(`${movie.release_date}`)}\n`;
  });

  console.log(string);
}

const renderMovieData = async (movie) => {
  let string = `${chalk.white('\n----------------------------------------')}\n\n`;
  string += `${chalk.white('Movie:')}\n\n`;
  string += `ID: ${chalk.white(`${movie.id}`)}\n`;
  if (movie.title) string += `Title: ${chalk.bold.blue(`${movie.title}`)}\n`;
  if (movie.original_name) string += `Title: ${chalk.bold.blue(`${movie.original_name}`)}\n`;
  string += `Release Date: ${chalk.white(`${movie.release_date}`)}\n`;
  string += `Runtime: ${chalk.white(`${movie.runtime}`)}\n`;
  string += `Vote Count: ${chalk.white(`${movie.vote_count}`)}\n`;
  string += `Overview: ${chalk.white(`${movie.overview}`)}\n`;

  if (movie.genres.length > 0) {
    string += `\nGenres: \n\n`;
    movie.genres.forEach(genre => {
      string += `${chalk.white(`${genre.name}`)}\n`;
    });
  }
  else {
    string += `The movie doesn’t have a declared genre\n`;
  }

  string += `\nSpoken languages: \n\n`;
  if (movie.spoken_languages.length > 0) {
    movie.spoken_languages.forEach(language => {
      string += `${chalk.white(`${language.name}`)}\n`;
    });
  }
  else {
    string += `The movie: ${movie.id} doesn’t have any declared languages\n`;
  }

  console.log(string);
}

const renderMovieReviewsData = async (data) => {
  const { page, total_pages, results: reviews } = data;

  let string = `${chalk.white('\n----------------------------------------')}\n\n`;
  string += `Page: ${chalk.white(`${page} of ${total_pages}:`)}\n`;

  string += `\nReviews: \n\n`;
  if (reviews && reviews.length > 0) {
    reviews.forEach(review => {
      string += `${chalk.bold.blue(`${review.author}`)}\n\n`;
      string += `${chalk.white(`${review.content.slice(0, 400).concat('...')}`)}\n\n`;
    });
  }
  else {
    string += `The movie: ${movie.id} doesn’t have any reviews\n`;
  }

  console.log(string);
}

const moviesRender = {
  renderMoviesData,
  renderMovieData,
  renderMovieReviewsData
};

module.exports = moviesRender;
