import chalk from "chalk";
import dedent from "dedent-js";

const printError = (message) => {
    console.log(chalk.bgRed(' <ERROR> ') + ' ' + message)
}

const printSuccess = (message) => {
    console.log(chalk.bgGreen(' <SUCCES> ') + ' ' + message)
}

const printHelp = () => {
  console.log(dedent(
      `${chalk.bgCyan(' <HELP> ')}
      ${chalk.bgGray('Без параметров')} - виведення погоди
      ${chalk.bgGray('-s [CITY]')} - для встановлення міста
      ${chalk.bgGray('-h')} - для виведення допомоги
      ${chalk.bgGray('-t [API_KEY]')} - для збереження токена
      `
  ))
}

const printWeather = (res, icon) => {
    console.log(
        dedent(`
        ${chalk.bgYellow(' WEATHER ')} Погода в місті ${res.name}
        ${icon} ${res.weather[0].description}
        Температура: ${res.main.temp}° (відчувається як ${res.main.feels_like}°)
        Вологість: ${res.main.humidity}%
        Швидкість вітру: ${res.wind.speed}м/с
        `)
    );
}

export {printError, printHelp, printSuccess, printWeather}
