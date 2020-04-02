import React from 'react'
import './ProgressBar.scss'
import { Integer } from '../types/Types'

const ProgressBar: React.FC<{ width: Integer; progress: number }> = ({ width, progress }) => {
    return (
        <div className="progressbar" style={{ width }}>
            <div className="progress" style={{ width: `${progress * 100}%` }} />
        </div>
    )
}

export default ProgressBar
