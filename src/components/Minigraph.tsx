import React from 'react'
import { TimelineEntry } from '../types/Corona'
import './Minigraph.scss'
import { Integer } from '../types/Types'

const Minigraph: React.FC<{
    timeline: TimelineEntry[]
    barWidth?: Integer
    graphClass: string
    prefixText?: string
}> = ({ timeline, barWidth = 3, prefixText, graphClass }) => {
    const maxValue = Math.max(...timeline.map((v) => v.value)) || 0
    const lastValue = timeline[timeline.length - 1]
    const barBorder = 1
    const graphHeight = 40
    const graphWidth = timeline.length * (barWidth + barBorder)

    return (
        <div className={`minigraph ${graphClass}`}>
            <div className="bars" style={{ width: graphWidth }}>
                {timeline.map(({ date, value }) => (
                    <div key={date} className="date" title={`${date}: ${value}`} style={{ marginRight: barBorder }}>
                        <div className="bar" style={{ height: (value / maxValue) * graphHeight }} />
                    </div>
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
