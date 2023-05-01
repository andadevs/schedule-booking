import * as React from 'react';
import { useState, useEffect, CSSProperties } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';

import { locationTwoBookedSlotsMock } from './mock';
import {locationsMock} from "../../UI/molecules/Locations/mock"
import { ILocation, IBookedSlot } from '../../../common/types';

import SCBookModal from '../../UI/molecules/BookModal';
import SCTimeBlocks from '../../UI/molecules/TimeBlocks';
import SCLocations from '../../UI/molecules/Locations';
import SCToolbar from '../../UI/molecules/Toolbar';
import { setBookedSlotToLocation } from '../../../common/functions';

const Booking = () => {
  const [locations, setLocations] = useState<ILocation[]>([]);
  const [bookedSlot, setBookedSlot] = useState<IBookedSlot>();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (locations.length === 0) {
      setLocations(locationsMock);
    }
  }, [locations]);

  useEffect(() => {
    if (locations.length > 0) setBookedSlot(locationTwoBookedSlotsMock);
  }, [locations]);

  useEffect(() => {
    if(bookedSlot !== undefined && locations.length > 0) {
      const locationsWithBookedSlots = setBookedSlotToLocation(locations, bookedSlot)
      setLocations(locationsWithBookedSlots)
    }
  }, [bookedSlot])

  const openBookModalHandler = () => setShowModal(true);

  const updateBookModalState = () => {
    setShowModal(false);
  };

  const addBookHandler = (newBookedSlot: IBookedSlot) => {
    setShowModal(false);
    const locationsWithBookedSlots = setBookedSlotToLocation(locations, newBookedSlot)
    setLocations(locationsWithBookedSlots)
  };

  return (
    <div className='booking'>
      <SCToolbar openBookModalHandler={openBookModalHandler} />
      <div className='flex-container'>
        <SCTimeBlocks />
        <SCLocations locations={locations} />
      </div>
      <SCBookModal
        showModal={showModal}
        updateModalState={updateBookModalState}
        addHandler={addBookHandler}
        locations={locations}
      />
    </div>
  );
}

export default Booking
