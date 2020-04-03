import React from 'react'
import { TimelineEntry } from '../types/Corona'
import './Minigraph.scss'
import MinigraphBar from './MinigraphBar'
import { useHover } from '../hooks/hover'

const barBorder = 1
const barWidth = 3

const Minigraph: React.FC<{
    timeline: TimelineEntry[]
    graphClass: string
    prefixText?: string
}> = ({ timeline, prefixText, graphClass }) => {
    const maxValue = Math.max(...timeline.map((v) => v.value)) || 0
    const lastValue = timeline[timeline.length - 1]
    const graphWidth = timeline.length * (barWidth + barBorder)

    return (
        <div className={`minigraph ${graphClass}`}>
            <div className="bars" style={{ width: graphWidth }}>
                {timeline.map(({ date, value }) => (
                    <MinigraphBar key={date} date={date} value={value} maxValue={maxValue} barBorder={barBorder} />
                ))}
            </div>
            <div className="legend">
                {prefixText}
                <span className="value">{lastValue.value}</span>
            </div>
        </div>
    )
}

export default Minigraph
