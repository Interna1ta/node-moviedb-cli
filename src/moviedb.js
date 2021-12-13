#!/usr/bin/env node

const { Command } = require("commander");
const ora = require("ora");

const program = new Command();
program.version("0.0.1");

const personsApi = require("./api/persons");
const moviesApi = require("./api/movies");

const persons = require("./render/persons");
// const movies = require("./render/movies");

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
  .action(async function handleAction() {
    const { data: { results } } = await moviesApi.getMovies();
    console.log(results);
  });

program
  .command("get-movie")
  .description("Make a network request to fetch the data of a single movie")
  .action(async function handleAction() {

    const { data } = await moviesApi.getMovie(movieId);
    console.log(data);
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
