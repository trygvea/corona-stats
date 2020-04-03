import React from 'react'
import './Minigraph.scss'
import { Integer, ISODate } from '../types/Types'
import { formatDateISO } from '../utils/date-util'

const MinigraphHover: React.FC<{
    date: ISODate
    value: Integer
}> = ({ date, value }) => {
    return (
        <div className="minigraph-hover">
            <div className="value">{value}</div>
            <div className="date">{formatDateISO(date)}</div>
        </div>
    )
}

export default MinigraphHover
