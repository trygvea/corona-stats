import React, { useCallback, useEffect, useMemo, useState } from 'react'
import './PerCountryPage.scss'
import { toCsv, toJson } from '../../utils/fetch-util'
import { Population, CountryData } from '../../model/Corona'
import { lastYearsPopulation, transformCovidCases } from '../../transform/corona'
import Minigraph from '../Minigraph'

const urls = {
    poulationPerCountry:
        'https://pkgstore.datahub.io/JohnSnowLabs/population-figures-by-country/population-figures-by-country-csv_json/data/2159fad77778c3b584f3d396593e0af6/population-figures-by-country-csv_json.json',
    covidDeathCases: 'https://covid.ourworldindata.org/data/ecdc/new_deaths.csv',
}

const PerCountryPage = () => {
    const [populationData, setPopulationData] = useState<Population[]>([])
    const [deathCases, setDeathCases] = useState<CountryData[]>([])

    useEffect(() => {
        fetch(urls.poulationPerCountry).then(toJson).then(lastYearsPopulation).then(setPopulationData)
    }, [])

    useEffect(() => {
        fetch(urls.covidDeathCases).then(toCsv).then(transformCovidCases).then(setDeathCases)
    }, [])

    const merged = useMemo(() => {
        return deathCases.map((countryData) => {
            const population = populationData.find(({ country }) => country === countryData.name)
            return {
                ...countryData,
                population: population?.population,
                totalPerCapita: population?.population ? countryData.total / population.population : 0,
            }
        })
    }, [populationData, deathCases])

    useCallback(() => {
        const countriesWithoutPopulation = merged.filter((c) => !c.population)
        if (countriesWithoutPopulation.length > 0) {
            console.warn(
                'No population found for the following countries:',
                countriesWithoutPopulation.map((c) => c.name)
            )
        }
    }, [merged])

    return (
        <div className="countries">
            {merged
                .filter((c) => c.maxValue > 0)
                .sort((a, b) => b.totalPerCapita - a.totalPerCapita)
                .map((country) => (
                    <div
                        key={country.name}
                        className="country"
                        title={`Total: ${country.total}, per million: ${Math.round(
                            (country.totalPerCapita || 0) * 1e6
                        )}`}
                    >
                        <div className="country-name">{country.name}</div>
                        <div className="deaths-per-capita"></div>
                        <Minigraph timeline={country.values.slice(-15)} />
                    </div>
                ))}
        </div>
    )
}

export default PerCountryPage
