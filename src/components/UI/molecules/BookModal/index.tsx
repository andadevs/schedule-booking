import * as React from 'react';
import { useState, useEffect, ChangeEvent } from 'react';

import {
  IBookedSlot,
  ILocation,
  ITimeBlock,
} from '../../../../common/types';
import { IBookModalProp } from "./type"
import { generateRandomHexaColor, updateTimeBlockStatus } from '../../../../common/functions';
import { timeBlocksMock } from '../../../../common/mock';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import { bookingSetup } from '../../../../common/config';

const BookModal = ({
  showModal,
  addHandler,
  updateModalState,
  locations,
}: IBookModalProp) => {
  const [show, setShow] = useState<boolean>();
  const [dropLocations, setDropLocations] = useState<ILocation[]>([]);
  const [timesBlocks, setTimesBlocks] = useState<ITimeBlock[]>([]);
  const [locationIdSelected, setLocationIdSelected] = useState<string>("")
  const [selectedStartTimePosition, setSelectedStartTimePosition] = useState<string>("")
  const [selectedEndTimePosition, setSelectedEndTimePosition] = useState<string>("")

  useEffect(() => {
    setShow(showModal);
  }, [showModal]);

  useEffect(() => {
    if (locations.length > 0) setDropLocations(locations);
  }, [locations]);

  const closeHandler = (): void => {
    setShow(false);
    updateModalState();
  };

  const locationSelectionHandler = (evt: ChangeEvent<HTMLSelectElement>): void => {
    const { target: { value } } = evt;
    if(value !== "none" && value) {
      setLocationIdSelected(value)

      if (locations.length > 0) {
        const locationSelected = locations.filter((ele) => ele.id === value)[0]
        const locationTimeBlockStatusUpdated = updateTimeBlockStatus(locationSelected, timeBlocksMock)
        setTimesBlocks(locationTimeBlockStatusUpdated);
      }
    }
  };

  const startTimeSelectionHandler = (evt: ChangeEvent<HTMLSelectElement>): void => {
    const { target: { value } } = evt;
    if(value !== "none" && value) setSelectedStartTimePosition(value);
  };

  const endTimeSelectionHandler = (evt: ChangeEvent<HTMLSelectElement>): void => {
    const { target: { value } } = evt;
    if(value !== "none" && value && parseInt(value) >= parseInt(selectedStartTimePosition)) {
      setSelectedEndTimePosition(value);
    }else {
      console.log("seleecciona algo bueno")
    }
  };

  const saveHandler = (): void => {
    setShow(false);
    const { slotHeigth } = bookingSetup;
    const { slotsBooked } = locations.filter((ele) => ele.id === locationIdSelected)[0]
    const id = `bookedSlot${slotsBooked.length === 0 ? "1" : slotsBooked.length + 1}`
    const title = `Booked ${slotsBooked.length === 0 ? "1" : slotsBooked.length + 1}`
    const timeBlocksTaked = (parseInt(selectedEndTimePosition) - parseInt(selectedStartTimePosition)) + 1
    const bookedPosition = parseInt(selectedStartTimePosition)
    let top = slotsBooked.length === 0 || bookedPosition === 1 ? "0" : `${(bookedPosition * slotHeigth) - slotHeigth}px`;
    const bookedSlotHeight = `${timeBlocksTaked * slotHeigth}px`
    
    let listOfPositions: number[] = [];
    
    for(var i = parseInt(selectedStartTimePosition); i <= parseInt(selectedEndTimePosition); i++ ) {
      listOfPositions.push(i)
    }

    const newBookedSlot: IBookedSlot = {
      id,
      title,
      timeBlocksTaked,
      locationId: locationIdSelected,
      positions: listOfPositions,
      style: {
        top,
        height: bookedSlotHeight,
        backgroundColor: generateRandomHexaColor(),
      },
    };

    addHandler(newBookedSlot);
  };

  return (
    <Modal show={show} onHide={closeHandler} backdrop={false}>
      <Modal.Header closeButton>
        <Modal.Title>Booking a Time</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="locations">
            <FloatingLabel controlId="locationSelection" label="Select a Location">
              <Form.Select aria-label="Select a Location" onChange={locationSelectionHandler}>
                <option value="none">List of Locations</option>
                {dropLocations.map(({ id, title }) => (
                  <option value={id} key={id}>
                    {title}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-3" controlId="startTime" onChange={startTimeSelectionHandler}>
            <FloatingLabel controlId="startTimeSelection" label="Select a Start Time">
              <Form.Select aria-label="Select a StartTime">
                <option value="none">List of Start Time</option>
                {timesBlocks.map(({ position, label, disabled }) => (
                  <option value={position} disabled={disabled} key={label}>
                    {label}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-3" controlId="endTime" onChange={endTimeSelectionHandler}>
            <FloatingLabel controlId="endTimeSelection" label="Select an End Time">
              <Form.Select aria-label="Select a EndTime">
                <option value="none">List of End Time</option>
                {timesBlocks.map(({ position, label, disabled }) => (
                  <option value={position} disabled={disabled} key={label}>
                    {label}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeHandler}>
          Close
        </Button>
        <Button variant="primary" onClick={saveHandler}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BookModal;
