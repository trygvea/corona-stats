import React, { useCallback, useContext, useMemo } from 'react'
import { CountryData } from '../types/Corona'
import './PerCountryTable.scss'
import PerCountryTableRow from './PerCountryTableRow'
import { PerCountryPageContext } from '../pages/PerCountryPage'

const PerCountryTable: React.FC<{ countryData: CountryData[] }> = ({ countryData }) => {
    const maxDeathsPerCapita = Math.max(...countryData.map((c) => c.deaths.totalPerCapita || 0))

    const searchProps = useContext(PerCountryPageContext)

    const countryFilter = useCallback(
        (country: CountryData): boolean => {
            if (searchProps.hideTinyCountries && (country.population || 0) < 200000) {
                return false
            }
            return true
        },
        [searchProps]
    )

    const countrySorter = useCallback(
        (a: CountryData, b: CountryData): number => {
            if (searchProps.showWorldFirst) {
                if (a.name === 'World') {
                    return Number.MIN_SAFE_INTEGER
                }
                if (b.name === 'World') {
                    return Number.MAX_SAFE_INTEGER
                }
            }
            return b.deaths.totalPerCapita - a.deaths.totalPerCapita
        },
        [searchProps]
    )

    const countries = useMemo(() => {
        return [...countryData].sort(countrySorter).filter(countryFilter)
    }, [countryData, countryFilter, countrySorter])

    return (
        <table className="countries mtl">
            <thead>
                <tr>
                    <th></th>
                    {searchProps.showCasesTotal && <th className="align-center">Cases</th>}
                    {searchProps.showCasesNew && <th className="align-center">Cases</th>}
                    <th>Total Deaths</th>
                    {searchProps.showDeathsTotal && <th className="align-center">Deaths</th>}
                    {searchProps.showDeathsNew && <th className="align-center">Deaths</th>}
                </tr>
                <tr>
                    <th>Location</th>
                    {searchProps.showCasesTotal && <th className="align-center">total</th>}
                    {searchProps.showCasesNew && <th className="align-center">new</th>}
                    <th>per mill capita</th>
                    {searchProps.showDeathsTotal && <th className="align-center">total</th>}
                    {searchProps.showDeathsNew && <th className="align-center">new</th>}
                </tr>
            </thead>
            <tbody>
                {countries.map((country) => (
                    <PerCountryTableRow key={country.name} country={country} maxDeathsPerCapita={maxDeathsPerCapita} />
                ))}
            </tbody>
        </table>
    )
}

export default PerCountryTable
