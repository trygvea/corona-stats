import React from 'react'
import { CountryData } from '../types/Corona'
import { formatCompact } from '../utils/number-util'

const CountryHover: React.FC<{ country: CountryData }> = ({ country }) => {
    return (
        <div className="country-hover">
            <span className="foo">Population: {formatCompact(country.population)}</span>
            {/*,{' '}<span className="foo">Total deaths: {formatCompact(country.total)}</span>*/}
        </div>
    )
}

export default CountryHover
