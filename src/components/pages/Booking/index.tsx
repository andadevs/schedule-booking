import * as React from 'react';
import { useState, useEffect, CSSProperties } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';

import { bookedSlotsMock } from './mock';
import {locationsMock} from "../../UI/molecules/Locations/mock"
import { ILocation, IBookedSlot } from '../../../common/types';

import SCBookModal from '../../UI/molecules/BookModal';
import SCTimeBlocks from '../../UI/molecules/TimeBlocks';
import SCLocations from '../../UI/molecules/Locations';
import SCToolbar from '../../UI/molecules/Toolbar';

const Booking = () => {
  const [locations, setLocations] = useState<ILocation[]>([]);
  const [bookedSlots, setBookedSlots] = useState<IBookedSlot[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (locations.length === 0) {
      setLocations(locationsMock);
    }
  }, [locations]);

  useEffect(() => {
    if (locations.length > 0) setBookedSlots(bookedSlotsMock);
  }, [locations]);

  const openBookModalHandler = () => setShowModal(true);

  const updateBookModalState = () => {
    setShowModal(false);
  };

  const addBookHandler = (newBookedSlot: IBookedSlot) => {
    setShowModal(false);
    setBookedSlots((currentBookSlots) => [...currentBookSlots, newBookedSlot]);
  };

  return (
    <div className='booking'>
      <SCToolbar openBookModalHandler={openBookModalHandler} />
      <div className='flex-container'>
        <SCTimeBlocks />
        <SCLocations bookedSlots={[]} />
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
