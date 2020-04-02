import React from 'react'
import { TimelineEntry } from '../types/Corona'
import './Minigraph.scss'
import { Integer } from '../types/Types'

const Minigraph: React.FC<{ timeline: TimelineEntry[]; barWidth?: Integer }> = ({ timeline, barWidth = 3 }) => {
    const maxValue = Math.max(...timeline.map((v) => v.value))
    const lastValue = timeline[timeline.length - 1]
    const barBorder = 1
    const graphHeight = 40
    const graphWidth = timeline.length * (barWidth + barBorder)

    return (
        <div className="minigraph">
            <div className="bars" style={{ width: graphWidth }}>
                {timeline.map(({ date, value }) => (
                    <div key={date} className="date" title={`${date}: ${value}`} style={{ marginRight: barBorder }}>
                        <div className="bar" style={{ height: maxValue ? (value / maxValue) * graphHeight : 0 }}></div>
                    </div>
                ))}
            </div>
            <div className="legend">
                +<span className="value">{lastValue.value}</span>
            </div>
        </div>
    )
}

export default Minigraph
