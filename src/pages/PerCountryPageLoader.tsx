import { useEffect, useMemo, useState } from 'react'
import './PerCountryPage.scss'
import { toCsv } from '../utils/fetch-util'
import { Population, CountryData, LoadedTimeline, EmptyTimeline } from '../types/Corona'
import { transpose } from '../utils/array-util'
import { sum } from '../utils/number-util'
import { toNumberOrZero } from '../utils/string-util'
import { fetchWorldPopulation, findPopulation } from '../data/population'

const urls = {
    populationPerCountry:
        'https://pkgstore.datahub.io/JohnSnowLabs/population-figures-by-country/population-figures-by-country-csv_json/data/2159fad77778c3b584f3d396593e0af6/population-figures-by-country-csv_json.json',
    covidNewDeaths: 'https://covid.ourworldindata.org/data/ecdc/new_deaths.csv',
    covidNewCases: 'https://covid.ourworldindata.org/data/ecdc/new_cases.csv',
}

/**
 * Transform corona data from csv file to local data structure
 */
const transformCovidCases = (csv: string[][]): LoadedTimeline[] => {
    const [firstRow, ...data] = csv
    const [, ...countries] = firstRow
    const rowsWithData = data.filter((row) => row.length > 1)
    const [dates, ...valuesPerCountry] = transpose(rowsWithData)

    return countries
        .map((country, i) => {
            const values = valuesPerCountry[i].map((stringValue) => toNumberOrZero(stringValue))
            return {
                countryName: country,
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

const mergeData = (
    populationData: Population[],
    newDeaths: LoadedTimeline[],
    newCases: LoadedTimeline[]
): CountryData[] => {
    const decorated = newDeaths.map((countryDeaths) => {
        const population = findPopulation(countryDeaths.countryName, populationData)
        const countryCases = newCases.find((c) => c.countryName === countryDeaths.countryName) || EmptyTimeline
        return {
            population: population?.population,
            name: countryDeaths.countryName,
            deaths: {
                ...countryDeaths,
                totalPerCapita: population?.population ? countryDeaths.total / population.population : 0,
            },
            cases: {
                ...countryCases,
                totalPerCapita: population?.population ? (countryCases?.total || 0) / population.population : 0,
            },
        }
    })
    verifyPopulation(decorated, populationData)
    return decorated
}

export const usePageLoader = (): CountryData[] => {
    const [populationData, setPopulationData] = useState<Population[]>([])
    const [newDeaths, setNewDeaths] = useState<LoadedTimeline[]>([])
    const [newCases, setNewCases] = useState<LoadedTimeline[]>([])

    useEffect(() => {
        fetchWorldPopulation().then(setPopulationData)
    }, [])

    useEffect(() => {
        fetch(urls.covidNewDeaths).then(toCsv).then(transformCovidCases).then(setNewDeaths)
    }, [])

    useEffect(() => {
        fetch(urls.covidNewCases).then(toCsv).then(transformCovidCases).then(setNewCases)
    }, [])

    return useMemo(() => {
        return mergeData(populationData, newDeaths, newCases)
    }, [populationData, newDeaths, newCases])
}
