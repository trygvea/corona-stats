import React from 'react'
import { CountryData } from '../model/Corona'
import './PerCountryTable.scss'
import PerCountryTableRow from './PerCountryTableRow'

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
                        <PerCountryTableRow key={country.name} country={country} maxPerCapita={maxPerCapita} />
                    ))}
            </tbody>
        </table>
    )
}

export default PerCountryTable
