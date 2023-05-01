import React from "react"
import "./style.scss"
import { timeStartBlocksMock } from "../../../../common/mock"

const TimeBlocks = () => {
    return (
        <div className="time-blocks-container">
            <div className="header"></div>
            <div className="blocks">
                {timeStartBlocksMock.map(({ label }) => (
                    <div className="block"  key={label}>{label}</div>
                ))}
            </div>
        </div>
    )
}

export default TimeBlocks