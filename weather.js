#!/usr/bin/env node

import {printError, printHelp, printSuccess, printWeather} from "./services/log.service.js";
import {getKeyValue, saveKeyValue, TOKEN_DICTIONARY} from "./services/storage.service.js";
import {getIcon, getWeather} from "./services/api.service.js";
import yargs from "yargs";
import {hideBin} from "yargs/helpers";


const saveToken = async (token) => {
    if (!token.length) {
        printError('Не передано token.')
        return
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token)
        printSuccess('Токен збережено!')
    } catch (e){
        printError(e)
    }
}

const saveCity = async (city) => {
    if (!city.length) {
        printError('Не передано City')
        return
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city)
        printSuccess('City збережено!')
    } catch (e){
        printError(e)
    }
}

const getForecast = async () => {
    try {
        const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city);
        const weather =  await getWeather(city)
        printWeather(weather, getIcon(weather.weather[0].icon));
    } catch (e) {
        if (e?.response?.status === 404) {
            printError('Невірно вказано місто');
        } else if (e?.response?.status === 401) {
            printError('Невірно вказано token')
        } else {
            printError(e.message)
        }
    }

}
const initCLI = () => {
    const argv = yargs(hideBin(process.argv)).parse();
    if (argv.h) {
        return printHelp()
    }
    if (argv.s) {
        return saveCity(argv.s)
    }
    if (argv.t) {
        return saveToken(argv.t)
    }
    return getForecast();
}

initCLI();
