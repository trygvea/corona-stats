import { toJson } from '../utils/fetch-util'
import { Population } from '../model/Corona'

// NOTE: This service seems to have political issues. For instance it seems to have noe entries for Palestine or Taiwan.

// https://datahub.io/JohnSnowLabs/population-figures-by-country
const populationUrl =
    'https://pkgstore.datahub.io/JohnSnowLabs/population-figures-by-country/population-figures-by-country-csv_json/data/2159fad77778c3b584f3d396593e0af6/population-figures-by-country-csv_json.json'

const ALTERNATE_COUNTRY_NAMES: { [key: string]: string } = {
    Brunei: 'Brunei Darussalam',
    Bahamas: 'Bahamas, The',
    Congo: 'Congo, Rep.',
    'Cape Verde': 'Cabo Verde',
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

export async function fetchWorldPopulation(): Promise<Population[]> {
    return fetch(populationUrl).then(toJson).then(lastYearsPopulation)
}

export const findPopulation = (countryName: string, populationData: Population[]): Population | undefined => {
    const _findPop = (countryName: string) => populationData.find(({ country }) => country === countryName)
    const population = _findPop(countryName)
    if (population) {
        return population
    }
    const alternateName = ALTERNATE_COUNTRY_NAMES[countryName]
    return alternateName ? _findPop(alternateName) : undefined
}
