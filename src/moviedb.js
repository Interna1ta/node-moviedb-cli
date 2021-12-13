#!/usr/bin/env node

const { Command } = require("commander");
const ora = require("ora");

const program = new Command();
program.version("0.0.1");

const personsApi = require("./api/persons");
const moviesApi = require("./api/movies");

const persons = require("./render/persons");
const movies = require("./render/movies");

program
  .command("get-persons")
  .description("Make a network request to fetch most popular persons")
  .requiredOption("-p, --popular", "Fetch the popular persons")
  .requiredOption("--page <number>", "The page of persons data results to fetch")
  .action(async function handleAction(programOptions) {
    let spinner = ora(`Fetching the popular person's data...`).start();

    const { data } = await personsApi.getPersons(programOptions);

    persons.renderPersonsData(data);

    spinner.succeed(`Popular Persons data loaded`);
    spinner.stop();
  });

program
  .command("get-person")
  .description("Make a network request to fetch the data of a single person")
  .requiredOption("-i, --id <personID>", "The id of the person")
  .action(async function handleAction(programOptions) {
    let spinner = ora(`Fetching the popular person's data...`).start();

    const personId = programOptions.id;
    const { data: person } = await personsApi.getPerson(personId);

    persons.renderPersonData(person);

    spinner.succeed(`Person data loaded`);
    spinner.stop();
  });

program
  .command("get-movies")
  .description("Make a network request to fetch movies")
  .requiredOption("--page <number>", "The page of movies data results to fetch")
  .option("-p, --popular", "Fetch the popular movies")
  .option("-n, --now-playing", "Fetch the movies that are playing now")
  .action(async function handleAction(programOptions) {
    let spinner = ora(`Fetching the movies data...`).start();

    const { data } = await moviesApi.getMovies(programOptions);

    movies.renderMoviesData(data);

    spinner.succeed(`Popular Movies data loaded.`);
    spinner.stop();
  });

program
  .command("get-movie")
  .description("Make a network request to fetch the data of a single movie")
  .option("-r, --reviews", "Fetch the reviews of the movie")
  .requiredOption("-i, --id <movieID>", "The id of the movie")
  .action(async function handleAction(programOptions) {
    let spinner = ora(`Fetching the movie data...`).start();

    if (programOptions.reviews) {
      const { data } = await moviesApi.getMovieReviews(programOptions);
      if (data) movies.renderMovieReviewsData(data);

      spinner.succeed(`Movie reviews data loaded.`);
    }

    if (!programOptions.reviews) {
      const { data } = await moviesApi.getMovie(programOptions);
      if (data) movies.renderMovieData(data);

      spinner.succeed(`Movie data loaded.`);
    }

    spinner.stop();
  });

// error on unknown commands
program.on("command:*", function () {
  console.error(
    "Invalid command: %s\nSee --help for a list of available commands.",
    program.args.join(" ")
  );
  process.exit(1);
});

program.parse(process.argv);
