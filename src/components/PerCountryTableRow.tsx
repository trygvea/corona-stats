import React from 'react'
import Minigraph from './Minigraph'
import ProgressBar from './ProgressBar'
import { CountryData } from '../types/Corona'
import { useHover } from '../hooks/hover'
import CountryHover from './CountryHover'

const PerCountryTableRow: React.FC<{ country: CountryData; maxPerCapita: number }> = ({ country, maxPerCapita }) => {
    const [rowRef, isHovered] = useHover()

    return (
        <tr
            // @ts-ignore
            ref={rowRef}
            title={`Total: ${country.total}, per million: ${Math.round((country.totalPerCapita || 0) * 1e6)}`}
        >
            <td className="country-name">
                {country.name}
                {isHovered && <CountryHover country={country} />}
            </td>
            <td className="deaths-per-capita prl">
                {country.population ? (
                    <div className="deaths-per-capita-bar">
                        <ProgressBar width={100} progress={country.totalPerCapita / maxPerCapita} />
                        <div className="progressbar-overlay">{Math.round(country.totalPerCapita * 1e6)}</div>
                    </div>
                ) : (
                    <div className="info-small">No population data</div>
                )}
            </td>
            <td>
                <Minigraph timeline={country.values.slice(-40)} barWidth={3} />
            </td>
        </tr>
    )
}

export default PerCountryTableRow
