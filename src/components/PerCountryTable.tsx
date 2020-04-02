import React, { useContext } from 'react'
import { CountryData } from '../types/Corona'
import './PerCountryTable.scss'
import PerCountryTableRow from './PerCountryTableRow'
import { PerCountryPageContext } from '../pages/PerCountryPage'

const PerCountryTable: React.FC<{ countryData: CountryData[] }> = ({ countryData }) => {
    const maxPerCapita = Math.max(...countryData.map((c) => c.totalPerCapita || 0))

    const searchProps = useContext(PerCountryPageContext)

    const countryFilter = (country: CountryData): boolean => {
        if (searchProps.ignoreTinyCountries && (country.population || 0) < 200000) {
            return false
        }
        return true
    }

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
                    <th>per mill capita</th>
                    <th>per day</th>
                </tr>
            </thead>
            <tbody>
                {countryData
                    .sort((a, b) => b.totalPerCapita - a.totalPerCapita)
                    .filter(countryFilter)
                    .map((country) => (
                        <PerCountryTableRow key={country.name} country={country} maxPerCapita={maxPerCapita} />
                    ))}
            </tbody>
        </table>
    )
}

export default PerCountryTable
