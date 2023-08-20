#!usr/bin/env node
import {getArgs} from './helpers/args.js'
import {printError, printHelp, printSuccess} from "./services/log.service.js";
import {getKeyValue, saveKeyValue, TOKEN_DICTIONARY} from "./services/storage.service.js";
import {getWeather} from "./services/api.service.js";


const saveToken = async (token) => {
    if (!token.length) {
        printError('Не передан token.')
        return
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token)
        printSuccess('Токен сохранен!')
    } catch (e){
        printError(e)
    }
}

const saveCity = async (city) => {
    if (!city.length) {
        printError('Не передан City')
        return
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city)
        printSuccess('City сохранен!')
    } catch (e){
        printError(e)
    }
}

const getForecast = async () => {
    try {
        const weather = process.env.CITY ?? await getWeather(await getKeyValue(TOKEN_DICTIONARY.city))
        console.log(weather); // красивый вывод погоды
    } catch (e) {
        if (e?.response?.status === 404) {
            printError('Неверно указан город');
        } else if (e?.response?.status === 401) {
            printError('Неверно указан token')
        } else {
            printError(e.message)
        }
    }

}
const initCLI = () => {
    const args = getArgs(process.argv)
    if (args.h) {
        printHelp()
    }
    if (args.s) {
        return saveCity(args.s)
    }
    if (args.t) {
        return saveToken(args.t)
    }
    getForecast();
}

initCLI();
