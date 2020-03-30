import { transpose } from '../utils/array-util'
import { DeathCase } from '../model/Corona'

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
