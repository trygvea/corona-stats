import React from 'react'
import Minigraph from './Minigraph'
import ProgressBar from './ProgressBar'
import { CountryData } from '../model/Corona'
import './PerCountryTable.scss'

const PerCountryTable: React.FC<{ countryData: CountryData[] }> = ({ countryData }) => {
    const maxPerCapita = Math.max(...countryData.map((c) => c.totalPerCapita || 0))

    return (
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
                {countryData
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
                                    <div className="info-small">No population data</div>
                                )}
                            </td>
                            <td>
                                <Minigraph timeline={country.values.slice(-44)} />
                            </td>
                        </tr>
                    ))}
            </tbody>
        </table>
    )
}

export default PerCountryTable
