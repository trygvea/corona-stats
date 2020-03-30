import React, { useEffect, useState } from 'react'
import './PerCountryPage.scss'
import { toCsv, toJson } from '../../utils/fetch-util'
import { DeathCase, Population } from '../../model/Corona'
import { lastYearsPopulation, transformCovidCases } from '../../transform/corona'

const urls = {
    poulationPerCountry:
        'https://pkgstore.datahub.io/JohnSnowLabs/population-figures-by-country/population-figures-by-country-csv_json/data/2159fad77778c3b584f3d396593e0af6/population-figures-by-country-csv_json.json',
    covidDeathCases: 'https://covid.ourworldindata.org/data/ecdc/new_deaths.csv',
}

const PerCountryPage = () => {
    const [population, setPopulation] = useState<Population[]>([])
    const [deathCases, setDeathCases] = useState<DeathCase[]>([])

    useEffect(() => {
        fetch(urls.poulationPerCountry).then(toJson).then(lastYearsPopulation).then(setPopulation)
    }, [])

    useEffect(() => {
        fetch(urls.covidDeathCases).then(toCsv).then(transformCovidCases).then(setDeathCases)
    }, [])

    return (
        <div className="countries">
            {deathCases
                .filter((c) => c.maxDeaths > 0)
                .sort((a, b) => b.maxDeaths - a.maxDeaths)
                .map((country) => (
                    <div key={country.country} className="country">
                        <div className="country-name">{country.country}</div>
                        <div className="minigraph">
                            {country.deaths.slice(-15).map(({ date, deaths }) => (
                                <div key={date} className="date" title={`${date}: ${deaths}`}>
                                    <div className="bar" style={{ height: (deaths / country.maxDeaths) * 30 }}></div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
        </div>
    )
}

export default PerCountryPage
