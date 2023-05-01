import * as React from 'react';
import { useState, useEffect, ChangeEvent } from 'react';

import {
  IBookedSlot,
  ILocation,
  ITimeBlock,
} from '../../../../common/types';
import { IBookModalProp } from "./type"
import { generateRandomHexaColor } from '../../../../common/functions';
import { timeStartBlocksMock, timeEndBlocksMock } from '../../../../common/mock';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const BookModal = ({
  showModal,
  addHandler,
  updateModalState,
  locations,
}: IBookModalProp) => {
  const [show, setShow] = useState<boolean>();
  const [dropLocations, setDropLocations] = useState<ILocation[]>([]);
  const [timesStartBlock, setTimesStartBlock] = useState<ITimeBlock[]>([]);
  const [timesEndBlock, setTimesEndBlock] = useState<ITimeBlock[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("")
  const [selectedStartTimePosition, setSelectedStartTimePosition] = useState<string>("")
  const [selectedEndTimePosition, setSelectedEndTimePosition] = useState<string>("")

  useEffect(() => {
    setShow(showModal);
  }, [showModal]);

  useEffect(() => {
    if (locations.length > 0) setDropLocations(locations);
  }, [locations]);

  useEffect(() => {
    setTimesStartBlock(timeStartBlocksMock);
  }, [timeStartBlocksMock]);

  useEffect(() => {
    setTimesEndBlock(timeEndBlocksMock);
  }, [timeEndBlocksMock]);

  const closeHandler = (): void => {
    setShow(false);
    updateModalState();
  };

  const locationSelectionHandler = (evt: ChangeEvent<HTMLSelectElement>): void => {
    const { target: { value } } = evt;
    setSelectedLocation(value)
  }

  const startTimeSelectionHandler = (evt: ChangeEvent<HTMLSelectElement>): void => {
    const { target: { value } } = evt;
    setSelectedStartTimePosition(value)
  }

  const endTimeSelectionHandler = (evt: ChangeEvent<HTMLSelectElement>): void => {
    const { target: { value } } = evt;
    setSelectedEndTimePosition(value)
  }

  const saveHandler = (): void => {
    setShow(false);
    const { slotsBooked } = locations.filter((ele) => ele.id === selectedLocation)[0]
    console.log("slotsBooked selected", slotsBooked)
    const id = `bookedSlot${slotsBooked.length === 0 ? "1" : slotsBooked.length + 1}`
    const title = `Booked ${slotsBooked.length === 0 ? "1" : slotsBooked.length + 1}`
    const timeBlocksTaked = (parseInt(selectedEndTimePosition) - parseInt(selectedStartTimePosition)) + 1
    const bookedPosition = parseInt(selectedStartTimePosition)
    let top = slotsBooked.length === 0 || bookedPosition === 1 ? "0" : `${(bookedPosition * 100) - 100}px`;
    const bookedSlotHeight = `${timeBlocksTaked * 100}px`
    const newBookedSlot: IBookedSlot = {
      id,
      title,
      timeBlocksTaked,
      locationId: selectedLocation,
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
            <Form.Label>Select a Location</Form.Label>
            <Form.Select aria-label="Select a Location" onChange={locationSelectionHandler}>
              <option>List of Locations</option>
              {dropLocations.map(({ id, title }) => (
                <option value={id} key={id}>
                  {title}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="startTime" onChange={startTimeSelectionHandler}>
            <Form.Label>Select a Start Time</Form.Label>
            <Form.Select aria-label="Select a StartTime">
              <option>List of Start Time</option>
              {timesStartBlock.map(({ position, label, disabled }) => (
                <option value={position} disabled={disabled} key={label}>
                  {label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="endTime" onChange={endTimeSelectionHandler}>
            <Form.Label>Select a End Time</Form.Label>
            <Form.Select aria-label="Select a EndTime">
              <option>List of End Time</option>
              {timesEndBlock.map(({ position, label, disabled }) => (
                <option value={position} disabled={disabled} key={label}>
                  {label}
                </option>
              ))}
            </Form.Select>
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
