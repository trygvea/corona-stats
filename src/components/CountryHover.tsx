import React from 'react'
import { CountryData } from '../types/Corona'
import { Integer } from '../types/Types'

const formatCompact = (n?: Integer): string => {
    if (!n) {
        return 'unknown'
    }
    // @ts-ignore
    return new Intl.NumberFormat('en-GB', { notation: 'compact', compactDisplay: 'short' }).format(n)
}

const CountryHover: React.FC<{ country: CountryData }> = ({ country }) => {
    return (
        <div className="country-hover">
            <span className="foo">Pop: {formatCompact(country.population)}</span>,{' '}
            <span className="foo">Total deaths: {formatCompact(country.total)}</span>
        </div>
    )
}

export default CountryHover
