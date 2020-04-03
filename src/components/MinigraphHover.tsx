import React from 'react'
import './Minigraph.scss'
import { Integer, ISODate } from '../types/Types'

const MinigraphHover: React.FC<{
    date: ISODate
    value: Integer
}> = ({ date, value }) => {
    return (
        <div className="minigraph-hover">
            {date}: {value}
        </div>
    )
}

export default MinigraphHover
