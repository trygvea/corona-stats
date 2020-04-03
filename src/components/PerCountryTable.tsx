import React, { useContext } from 'react'
import { CountryData } from '../types/Corona'
import './PerCountryTable.scss'
import PerCountryTableRow from './PerCountryTableRow'
import { PerCountryPageContext } from '../pages/PerCountryPage'

const PerCountryTable: React.FC<{ countryData: CountryData[] }> = ({ countryData }) => {
    const maxDeathsPerCapita = Math.max(...countryData.map((c) => c.deaths.totalPerCapita || 0))

    const searchProps = useContext(PerCountryPageContext)

    const countryFilter = (country: CountryData): boolean => {
        if (searchProps.hideTinyCountries && (country.population || 0) < 200000) {
            return false
        }
        return true
    }

    const countrySorter = (a: CountryData, b: CountryData): number => {
        return b.deaths.totalPerCapita - a.deaths.totalPerCapita
    }

    return (
        <table className="countries mtl">
            <thead>
                <tr>
                    <th></th>
                    <th>Total Deaths</th>
                    {searchProps.showDeathsTotal && <th className="align-right">Deaths</th>}
                    {searchProps.showDeathsNew && <th className="align-right">Deaths</th>}
                </tr>
                <tr>
                    <th>Location</th>
                    <th>per mill capita</th>
                    {searchProps.showDeathsTotal && <th className="align-right">total</th>}
                    {searchProps.showDeathsNew && <th className="align-right">new</th>}
                </tr>
            </thead>
            <tbody>
                {countryData
                    .sort(countrySorter)
                    .filter(countryFilter)
                    .map((country) => (
                        <PerCountryTableRow
                            key={country.name}
                            country={country}
                            maxDeathsPerCapita={maxDeathsPerCapita}
                        />
                    ))}
            </tbody>
        </table>
    )
}

export default PerCountryTable
