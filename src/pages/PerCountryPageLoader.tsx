import { useEffect, useMemo, useState } from 'react'
import './PerCountryPage.scss'
import { toCsv } from '../utils/fetch-util'
import { Population, CountryData, Timeline } from '../types/Corona'
import { transpose } from '../utils/array-util'
import { sum } from '../utils/number-util'
import { toNumberOrZero } from '../utils/string-util'
import { fetchWorldPopulation, findPopulation } from '../data/population'

const urls = {
    populationPerCountry:
        'https://pkgstore.datahub.io/JohnSnowLabs/population-figures-by-country/population-figures-by-country-csv_json/data/2159fad77778c3b584f3d396593e0af6/population-figures-by-country-csv_json.json',
    covidDeathCases: 'https://covid.ourworldindata.org/data/ecdc/new_deaths.csv',
}

/**
 * Transform corona data from csv file to local data structure
 */
const transformCovidCases = (csv: string[][]): Timeline[] => {
    const [firstRow, ...data] = csv
    const [, ...countries] = firstRow
    const rowsWithData = data.filter((row) => row.length > 1)
    const [dates, ...valuesPerCountry] = transpose(rowsWithData)

    return countries
        .map((country, i) => {
            const values = valuesPerCountry[i].map((stringValue) => toNumberOrZero(stringValue))
            return {
                name: country,
                values: dates.map((date, j) => ({
                    date,
                    value: values[j],
                })),
                maxValue: Math.max(...values),
                total: sum(values),
            }
        })
        .filter((c) => c.maxValue > 0)
}

const verifyPopulation = (merged: CountryData[], populationData: Population[]): void => {
    const countriesWithoutPopulation = merged.filter((c) => !c.population)
    if (countriesWithoutPopulation.length > 0) {
        console.warn(
            'No population found for the following countries:',
            countriesWithoutPopulation.map((c) => c.name)
        )
        // console.warn(
        //     'You can fix this problem by making a mapping to one of theses:',
        //     populationData.map((c) => c.country)
        // )
    }
}

const addPopulation = (timeline: Timeline[], populationData: Population[]): CountryData[] => {
    const decorated = timeline.map((countryData) => {
        const population = findPopulation(countryData.name, populationData)
        return {
            ...countryData,
            population: population?.population,
            totalPerCapita: population?.population ? countryData.total / population.population : 0,
        }
    })
    verifyPopulation(decorated, populationData)
    return decorated
}

export const usePageLoader = (): CountryData[] => {
    const [populationData, setPopulationData] = useState<Population[]>([])
    const [deathCases, setDeathCases] = useState<Timeline[]>([])

    useEffect(() => {
        fetchWorldPopulation().then(setPopulationData)
    }, [])

    useEffect(() => {
        fetch(urls.covidDeathCases).then(toCsv).then(transformCovidCases).then(setDeathCases)
    }, [])

    return useMemo(() => {
        return addPopulation(deathCases, populationData)
    }, [populationData, deathCases])
}
