import React from 'react'
import './PerCountryPage.scss'
import Minigraph from '../Minigraph'
import ProgressBar from '../ProgressBar'
import { usePageLoader } from './PerCountryPageLoader'

const PerCountryPage = () => {
    const data = usePageLoader()
    const maxPerCapita = Math.max(...data.map((c) => c.totalPerCapita || 0))

    return (
        <div className="mll">
            <h1>Corona virus - deaths per capita</h1>

            <div>
                With data from <a href="https://ourworldindata.org/coronavirus">ourworldindata.org/coronavirus</a>{' '}
                &nbsp; and{' '}
                <a href="https://datahub.io/JohnSnowLabs/population-figures-by-country">datahub.io/JohnSnowLabs</a>.
            </div>

            <table className="countries mtl">
                <thead>
                    <tr>
                        <th></th>
                        <th>Total Deaths</th>
                        <th>Deaths</th>
                    </tr>
                    <tr>
                        <th>Location</th>
                        <th>per capita</th>
                        <th>per day</th>
                    </tr>
                </thead>
                <tbody>
                    {data
                        .sort((a, b) => b.totalPerCapita - a.totalPerCapita)
                        .map((country) => (
                            <tr
                                key={country.name}
                                className="country"
                                title={`Total: ${country.total}, per million: ${Math.round(
                                    (country.totalPerCapita || 0) * 1e6
                                )}`}
                            >
                                <td className="country-name">{country.name}</td>
                                <td className="deaths-per-capita prl">
                                    {country.population ? (
                                        <ProgressBar width={100} progress={country.totalPerCapita / maxPerCapita} />
                                    ) : (
                                        'No data for population found'
                                    )}
                                </td>
                                <td>
                                    <Minigraph timeline={country.values.slice(-44)} />
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
}

export default PerCountryPage
