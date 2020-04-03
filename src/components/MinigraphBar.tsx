import React from 'react'
import './Minigraph.scss'
import { Integer, ISODate } from '../types/Types'
import { useHover } from '../hooks/hover'
import MinigraphHover from './MinigraphHover'

const graphHeight = 40

const MinigraphBar: React.FC<{
    date: ISODate
    value: Integer
    maxValue: Integer
    barBorder: Integer
}> = ({ date, value, maxValue, barBorder }) => {
    const [barRef, isHovered] = useHover()
    return (
        <div
            // @ts-ignore
            ref={barRef}
            key={date}
            className="date"
            title={`${date}: ${value}`}
            style={{ marginRight: barBorder }}
        >
            <div className={`bar ${isHovered ? 'hover' : ''}`} style={{ height: (value / maxValue) * graphHeight }} />
            {isHovered && <MinigraphHover date={date} value={value} />}
        </div>
    )
}

export default MinigraphBar
