import { transpose } from '../utils/array-util'
import { DeathCase, Population } from '../model/Corona'

export const toNumber = (s?: string): number => new Number(s || '').valueOf()

/**
 * Transform the different data from https://covid.ourworldindata.org/data/ecdc
 * to a local structure.
 */
export const transformCovidCases = (csv: string[][]): DeathCase[] => {
    const [firstRow, ...data] = csv
    const [_, ...countries] = firstRow
    const rowsWithData = data.filter((row) => row.length > 1)
    const [dates, ...deathsPerCountry] = transpose(rowsWithData)

    return countries.map((country, i) => {
        const deaths = deathsPerCountry[i].map((death) => toNumber(death))
        return {
            country,
            deaths: dates.map((date, j) => ({
                date,
                deaths: deaths[j],
            })),
            maxDeaths: Math.max(...deaths),
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
