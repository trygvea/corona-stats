import { transpose } from '../utils/array-util'
import { CountryData, Population } from '../model/Corona'
import { sum } from '../utils/number-util'

export const toNumber = (s?: string): number => parseInt(s || '0')

/**
 * Transform the different data from https://covid.ourworldindata.org/data/ecdc
 * to a local structure.
 */
export const transformCovidCases = (csv: string[][]): CountryData[] => {
    const [firstRow, ...data] = csv
    const [, ...countries] = firstRow
    const rowsWithData = data.filter((row) => row.length > 1)
    const [dates, ...valuesPerCountry] = transpose(rowsWithData)

    return countries.map((country, i) => {
        const values = valuesPerCountry[i].map((stringValue) => toNumber(stringValue))
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
 * Transform world population as given from
 * https://pkgstore.datahub.io/JohnSnowLabs/population-figures-by-country/population-figures-by-country-csv_json/data/2159fad77778c3b584f3d396593e0af6/population-figures-by-country-csv_json.json
 */
export const lastYearsPopulation = (worldPopulation: any): Population[] =>
    worldPopulation.map((country: any) => {
        const lastYearKey = Object.keys(country).slice(-1)[0]
        return {
            country: country.Country,
            population: country[lastYearKey],
        }
    })
