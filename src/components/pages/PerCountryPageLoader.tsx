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

const ALTERNATE_COUNTRY_NAMES: { [key: string]: string } = {
    Brunei: 'Brunei Darussalam',
    Bahamas: 'Bahamas, The',
    Congo: 'Congo, Rep.',
    'Democratic Republic of Congo': 'Congo, Dem. Rep.',
    Egypt: 'Egypt, Arab Rep.',
    Eritrea: 'Eritrea',
    'Faeroe Islands': 'Faroe Islands',
    Gambia: 'Gambia, The',
    Iran: 'Iran, Islamic Rep.',
    Kyrgyzstan: 'Kyrgyz Republic',
    Laos: 'Lao PDR',
    Macedonia: 'Macedonia, FYR',
    Russia: 'Russian Federation',
    'Saint Kitts and Nevis': 'St. Kitts and Nevis',
    'Saint Lucia': 'St. Lucia',
    'Saint Vincent and the Grenadines': 'St. Vincent and the Grenadines',
    Slovakia: 'Slovak Republic',
    'South Korea': 'Korea, Dem. People’s Rep.',
    Syria: 'Syrian Arab Republic',
    Timor: 'Timor-Leste',
    Venezuela: 'Venezuela, RB',
    'United States Virgin Islands': 'Virgin Islands (U.S.)',
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

const verifyPopulation = (merged: CountryData[], populationData: Population[]): void => {
    const countriesWithoutPopulation = merged.filter((c) => !c.population)
    if (countriesWithoutPopulation.length > 0) {
        console.warn(
            'No population found for the following countries:',
            countriesWithoutPopulation.map((c) => c.name)
        )
        console.warn(
            'You can fix this problem by making a mapping to one of theses:',
            populationData.map((c) => c.country)
        )
    }
}

const findPopulation = (countryName: string, populationData: Population[]): Population | undefined => {
    const _findPop = (countryName: string) => populationData.find(({ country }) => country === countryName)
    const population = _findPop(countryName)
    if (population) {
        return population
    }
    const alternateName = ALTERNATE_COUNTRY_NAMES[countryName]
    return alternateName ? _findPop(alternateName) : undefined
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
        fetch(urls.populationPerCountry).then(toJson).then(lastYearsPopulation).then(setPopulationData)
    }, [])

    useEffect(() => {
        fetch(urls.covidDeathCases).then(toCsv).then(transformCovidCases).then(setDeathCases)
    }, [])

    return useMemo(() => {
        return addPopulation(deathCases, populationData)
    }, [populationData, deathCases])
}
