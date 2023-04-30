import React, {useState, useEffect} from "react"

import { locationsMock} from "./mock"
import { ILocationProp } from "./type"
import { ILocation } from "../../../../common/types"

import "./style.scss"

const Locations = ({ bookedSlots }: ILocationProp) => {
  const [locations, setLocations] = useState<ILocation[]>([])

  useEffect(() => {
    setLocations(locationsMock)
  }, [])

  return (
    <div className="locations">
      {locations.map(({ id, title, slots }) => (
        <div className="section" key={id}>
          <div className="header">
            <h1 className="title">{title}</h1>
          </div>
          <div className="slots">
            {bookedSlots.map(({ id, title, style }) => (
              <div className="slot-booked" style={style} key={id}>
                {title}
              </div>
            ))}
            {slots.map(({ title, id }) => (
              <div className="slot" key={id}>
                {title}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Locations