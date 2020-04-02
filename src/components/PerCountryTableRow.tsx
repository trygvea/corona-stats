import React, { useContext, useMemo } from 'react'
import Minigraph from './Minigraph'
import ProgressBar from './ProgressBar'
import { accumulateTotals, CountryData, TimelineEntry } from '../types/Corona'
import { useHover } from '../hooks/hover'
import CountryHover from './CountryHover'
import { PerCountryPageContext } from '../pages/PerCountryPage'

const numCols = 40

const PerCountryTableRow: React.FC<{ country: CountryData; maxPerCapita: number }> = ({ country, maxPerCapita }) => {
    const [rowRef, isHovered] = useHover()
    const searchProps = useContext(PerCountryPageContext)

    const deathsTotal = useMemo<TimelineEntry[]>(() => accumulateTotals(country.values), [country])

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
            {searchProps.showDeathsTotal && (
                <td>
                    <Minigraph timeline={deathsTotal.slice(-numCols)} barWidth={3} />
                </td>
            )}
            {searchProps.showDeathsNew && (
                <td>
                    <Minigraph timeline={country.values.slice(-numCols)} barWidth={3} />
                </td>
            )}
        </tr>
    )
}

export default PerCountryTableRow
