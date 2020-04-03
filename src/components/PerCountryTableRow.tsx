import React, { useContext, useMemo } from 'react'
import Minigraph from './Minigraph'
import ProgressBar from './ProgressBar'
import { accumulateTotals, CountryData, TimelineEntry } from '../types/Corona'
import { useHover } from '../hooks/hover'
import CountryHover from './CountryHover'
import { PerCountryPageContext } from '../pages/PerCountryPage'

const PerCountryTableRow: React.FC<{ country: CountryData; maxDeathsPerCapita: number }> = ({
    country,
    maxDeathsPerCapita,
}) => {
    const [rowRef, isHovered] = useHover()
    const searchProps = useContext(PerCountryPageContext)

    const deathsTotal = useMemo<TimelineEntry[]>(() => accumulateTotals(country.deaths.values), [country])
    const casesTotal = useMemo<TimelineEntry[]>(() => accumulateTotals(country.cases.values), [country])
    const numCols = searchProps.numHistoryDays

    return (
        <tr
            // @ts-ignore
            ref={rowRef}
            className={country.name === 'World' ? 'the-world' : ''}
            title={`Total deaths: ${country.deaths.total}, per million: ${Math.round(
                (country.deaths.totalPerCapita || 0) * 1e6
            )}`}
        >
            <td className="country-name">
                {country.name}
                {isHovered && <CountryHover country={country} />}
            </td>
            {searchProps.showCasesTotal && (
                <td>
                    <Minigraph timeline={casesTotal.slice(-numCols)} barWidth={3} graphClass="cases" />
                </td>
            )}
            {searchProps.showCasesNew && (
                <td>
                    <Minigraph
                        timeline={country.cases.values.slice(-numCols)}
                        barWidth={3}
                        graphClass="cases"
                        prefixText={'+'}
                    />
                </td>
            )}
            <td className="deaths-per-capita prl">
                {country.population ? (
                    <div className="deaths-per-capita-bar">
                        <ProgressBar width={100} progress={country.deaths.totalPerCapita / maxDeathsPerCapita} />
                        <div className="progressbar-overlay">{Math.round(country.deaths.totalPerCapita * 1e6)}</div>
                    </div>
                ) : (
                    <div className="info-small">No population data</div>
                )}
            </td>
            {searchProps.showDeathsTotal && (
                <td>
                    <Minigraph timeline={deathsTotal.slice(-numCols)} barWidth={3} graphClass="deaths" />
                </td>
            )}
            {searchProps.showDeathsNew && (
                <td>
                    <Minigraph
                        timeline={country.deaths.values.slice(-numCols)}
                        barWidth={3}
                        graphClass="deaths"
                        prefixText={'+'}
                    />
                </td>
            )}
        </tr>
    )
}

export default PerCountryTableRow
