import React from 'react'
import Minigraph from './Minigraph'
import ProgressBar from './ProgressBar'
import { CountryData } from '../model/Corona'
import { useHover } from '../hooks/hover'
import CountryHover from './CountryHover'

const PerCountryTableRow: React.FC<{ country: CountryData; maxPerCapita: number }> = ({ country, maxPerCapita }) => {
    const [rowRef, isHovered] = useHover()

    return (
        <tr
            // @ts-ignore
            ref={rowRef}
            className="country"
            title={`Total: ${country.total}, per million: ${Math.round((country.totalPerCapita || 0) * 1e6)}`}
        >
            <td className="country-name">
                {country.name}
                {isHovered && <CountryHover country={country} />}
            </td>
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
    )
}

export default PerCountryTableRow
