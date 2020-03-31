import { useEffect, useMemo, useState } from 'react'
import './PerCountryPage.scss'
import { toCsv, toJson } from '../../utils/fetch-util'
import { Population, CountryData, Timeline } from '../../model/Corona'
import { transpose } from '../../utils/array-util'
import { sum } from '../../utils/number-util'
import { toNumberOrZero } from '../../utils/string-util'

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

    return countries.map((country, i) => {
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
}

/**
 * Transform world population from weird json struct to local data structure
 */
const lastYearsPopulation = (worldPopulation: any): Population[] =>
    worldPopulation.map((country: any) => {
        const lastYearKey = Object.keys(country).slice(-1)[0]
        return {
            country: country.Country,
            population: country[lastYearKey],
        }
    })

const verifyPopulation = (merged: CountryData[]): void => {
    const countriesWithoutPopulation = merged.filter((c) => !c.population)
    if (countriesWithoutPopulation.length > 0) {
        console.warn(
            'No population found for the following countries:',
            countriesWithoutPopulation.map((c) => c.name)
        )
    }
}

const decorateTimeline = (timeline: Timeline[], populationData: Population[]): CountryData[] => {
    const decorated = timeline.map((countryData) => {
        const population = populationData.find(({ country }) => country === countryData.name)
        return {
            ...countryData,
            population: population?.population,
            totalPerCapita: population?.population ? countryData.total / population.population : 0,
        }
    })
    verifyPopulation(decorated)
    return decorated
}

export const usePageLoader = (): CountryData[] => {
    const [populationData, setPopulationData] = useState<Population[]>([])
    const [deathCases, setDeathCases] = useState<Timeline[]>([])

    useEffect(() => {
        fetch(urls.populationPerCountry).then(toJson).then(lastYearsPopulation).then(setPopulationData)
    }, [])

    useEffect(() => {
        fetch(urls.covidDeathCases).then(toCsv).then(transformCovidCases).then(setDeathCases)
    }, [])

    return useMemo(() => {
        return decorateTimeline(deathCases, populationData)
    }, [populationData, deathCases])
}
