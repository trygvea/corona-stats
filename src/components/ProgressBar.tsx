import React from 'react'
import './ProgressBar.scss'

const ProgressBar: React.FC<{ width: number; progress: number }> = ({ width, progress }) => {
    return (
        <div className="progressbar" style={{ width }}>
            <div className="progress" style={{ width: `${progress * 100}%` }} />
        </div>
    )
}

export default ProgressBar
