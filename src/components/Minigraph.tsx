import React from 'react'
import { TimelineEntry } from '../model/Corona'
import './Minigraph.scss'

const Minigraph: React.FC<{ timeline: TimelineEntry[] }> = ({ timeline }) => {
    const maxValue = Math.max(...timeline.map((v) => v.value))
    return (
        <div className="minigraph">
            {timeline.map(({ date, value }) => (
                <div key={date} className="date" title={`${date}: ${value}`}>
                    <div className="bar" style={{ height: maxValue ? (value / maxValue) * 30 : 0 }}></div>
                </div>
            ))}
        </div>
    )
}

export default Minigraph
