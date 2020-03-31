import React from 'react'
import './PerCountryPage.scss'
import Minigraph from '../Minigraph'
import ProgressBar from '../ProgressBar'
import { usePageLoader } from './PerCountryPageLoader'

const PerCountryPage = () => {
    const data = usePageLoader()
    const maxPerCapita = Math.max(...data.map((c) => c.totalPerCapita || 0))

    return (
        <div className="countries">
            {data
                .sort((a, b) => b.totalPerCapita - a.totalPerCapita)
                .map((country) => (
                    <div
                        key={country.name}
                        className="country"
                        title={`Total: ${country.total}, per million: ${Math.round(
                            (country.totalPerCapita || 0) * 1e6
                        )}`}
                    >
                        <div className="country-name">{country.name}</div>
                        <div className="stats">
                            <ProgressBar width={300} progress={country.totalPerCapita / maxPerCapita} />
                            <Minigraph timeline={country.values.slice(-15)} />
                        </div>
                    </div>
                ))}
        </div>
    )
}

export default PerCountryPage
