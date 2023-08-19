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
      ${chalk.bgGray('Без параметров')} - вывод погоды
      ${chalk.bgGray('-s [CITY]')} - для установки города
      ${chalk.bgGray('-h')} - для вывода помощи
      ${chalk.bgGray('-t [API_KEY]')} - для сохранения токена
      `
  ))
}

export {printError, printHelp, printSuccess}
