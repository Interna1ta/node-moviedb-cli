#!/usr/bin/env node

const { Command } = require("commander");
const ora = require("ora");

const program = new Command();
program.version("0.0.1");

const personsApi = require("./api/persons");
const moviesApi = require("./api/movies");

program
  .command("get-persons")
  .description("Make a network request to fetch most popular persons")
  .requiredOption("-p, --popular", "Fetch the popular persons")
  .requiredOption("--page <number>", "The page of persons data results to fetch")
  .action(async function handleAction() {
    let spinner = ora(`Fetching the popular person's data...`).start();

    const args = program.args;

    const { data: { results } } = await personsApi.getPersons(...args);
    console.log(results);

    if (results) {
      spinner.stop();
      spinner = ora(`Popular Persons data loaded`).succeed();
    }

  });

program
  .command("get-person")
  .description("Make a network request to fetch the data of a single person")
  .requiredOption("-i, --id <personID>", "The id of the person")
  .action(async function handleAction() {
    const { data: { results } } = await personsApi.getPerson(personId);
    console.log(results);
  });

program
  .command("get-movies")
  .description("Make a network request to fetch movies")
  .action(async function handleAction() {
    const { data: { results } } = await moviesApi.getMovies();
    console.log(results);
  });

program
  .command("get-movie")
  .description("Make a network request to fetch the data of a single movie")
  .action(async function handleAction() {

    const { data: { results } } = await moviesApi.getMovie(movieId);
    console.log(results);
  });

// error on unknown commands

program.parse(process.argv);
