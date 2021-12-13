const chalk = require("chalk");

const renderPersonsData = async (data) => {
  const { page, total_pages, results: persons } = data;

  let string = `${chalk.white('\n----------------------------------------')}\n\n`;
  string += `Page: ${chalk.white(`${page} of ${total_pages}:`)}\n`;

  persons.forEach(person => {
    string += `${chalk.white('\n----------------------------------------')}\n\n`;
    string += `${chalk.white('Person:')}\n\n`;
    string += `ID: ${chalk.white(`${person.id}`)}\n`;
    string += `Name: ${chalk.bold.blue(`${person.name}`)}\n`;
    if (person.known_for_department) string += `Department: ${chalk.magenta(`${person.known_for_department}`)}\n`;

    if (person.known_for.length > 0) {
      string += `Appearing in movies: \n\n`;
      person.known_for.forEach(movie => {
        if (movie.original_title) string += `${chalk.white(`${movie.original_title}`)}\n`;
        if (movie.original_name) string += `${chalk.white(`${movie.original_name}`)}\n`;
      });
    }
    else {
      string += `${person.name} doesn’t appear in any movie\n`;
    }
  });

  console.log(string);
}

const renderPersonData = async (person) => {
  let string = `${chalk.white('\n----------------------------------------')}\n\n`;
  string += `${chalk.white('Person:')}\n\n`;
  string += `ID: ${chalk.white(`${person.id}`)}\n`;
  string += `Name: ${chalk.bold.blue(`${person.name}`)}\n`;
  string += `Birthday: ${chalk.white(`${person.birthday}`)} ${chalk.gray(`|`)} ${chalk.white(`${person.place_of_birth}`)}\n`;
  if (person.known_for_department) string += `Department: ${chalk.magenta(`${person.known_for_department}`)}\n`;
  string += `Biography: ${chalk.bold.blue(`${person.biography}`)}\n\n`;

  if (person.also_known_as.length > 0) {
    string += `Also known as: \n\n`;
    person.also_known_as.forEach(name => {
      string += `${chalk.white(`${name}`)}\n`;
    });
  }

  console.log(string);
}

const personsRender = {
  renderPersonsData,
  renderPersonData,
};

module.exports = personsRender;
