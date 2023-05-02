import * as React from 'react';
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';

import {
  IBookedSlot,
  ILocation,
  ITimeBlock,
} from '../../../../common/types';
import { IBookModalProp } from "./type"
import { generateRandomHexaColor, updateTimeBlockStatus } from '../../../../common/functions';
import { timeBlocksMock } from '../../../../common/mock';
import { bookingSetup } from '../../../../common/config';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

const BookModal = ({
  showModal,
  addHandler,
  updateModalState,
  locations,
}: IBookModalProp) => {
  const [show, setShow] = useState<boolean>();
  const [dropLocations, setDropLocations] = useState<ILocation[]>([]);
  const [timesBlocks, setTimesBlocks] = useState<ITimeBlock[]>([]);
  const [locationIdSelected, setLocationIdSelected] = useState("")
  const [selectedStartTimePosition, setSelectedStartTimePosition] = useState("")
  const [selectedEndTimePosition, setSelectedEndTimePosition] = useState("")
  const [validatedForm, setValidatedForm] = useState(false);
  const [showValidationAlert, setShowValidationAlert] = useState(false)

  useEffect(() => {
    setShow(showModal);
  }, [showModal]);

  useEffect(() => {
    if (locations.length > 0) setDropLocations(locations);
  }, [locations]);

  const closeHandler = (): void => {
    setShow(false);
    updateModalState();
    setValidatedForm(false)
  };

  const locationSelectionHandler = (evt: ChangeEvent<HTMLSelectElement>): void => {
    const { target: { value } } = evt;
    if(value) {
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
    if(value) setSelectedStartTimePosition(value);
  };

  const endTimeSelectionHandler = (evt: ChangeEvent<HTMLSelectElement>): void => {
    const { target: { value } } = evt;
   if(value) setSelectedEndTimePosition(value);
  };

  const saveHandler = (evt: FormEvent<HTMLFormElement>): void => {
    const form = evt.currentTarget;
    evt.preventDefault();

    if (!form.checkValidity()) {
      evt.stopPropagation();
    }
    setValidatedForm(true);

    if(form.checkValidity()){
      const isValidTimeBlock = parseInt(selectedEndTimePosition) >= parseInt(selectedStartTimePosition);

      if(isValidTimeBlock) {
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
        setValidatedForm(false)
        setShowValidationAlert(false)
      } else {
        setValidatedForm(true)
        setShowValidationAlert(true)
      }
    }
  };

  return (
    <Modal show={show} onHide={closeHandler} backdrop={false}>
      <Modal.Header closeButton>
        <Modal.Title>Booking a Time</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showValidationAlert && (<Alert variant="warning" dismissible>
          <Alert.Heading>Oh snap!</Alert.Heading>
          <p>
            Remember that the End Time selected must be greather or equal to the Start Time selected.
          </p>
        </Alert>)}
        <Form noValidate validated={validatedForm} onSubmit={saveHandler}>
          <Form.Group className="mb-3" controlId="locations">
            <FloatingLabel controlId="locationSelection" label="Select a Location">
              <Form.Select onChange={locationSelectionHandler} required>
                <option value="">List of Locations</option>
                {dropLocations.map(({ id, title }) => (
                  <option value={id} key={id}>
                    {title}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please select a Location.
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-3" controlId="startTime">
            <FloatingLabel controlId="startTimeSelection" label="Select a Start Time">
              <Form.Select
                onChange={startTimeSelectionHandler}
                required
              >
                <option value="">List of Start Time</option>
                {timesBlocks.map(({ position, label, disabled }) => (
                  <option value={position} disabled={disabled} key={label}>
                    {label}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please select a Start Time.
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-3" controlId="endTime">
            <FloatingLabel controlId="endTimeSelection" label="Select an End Time">
              <Form.Select
                onChange={endTimeSelectionHandler}
                required
              >
                <option value="">List of End Time</option>
                {timesBlocks.map(({ position, label, disabled }) => (
                  <option value={position} disabled={disabled} key={label}>
                    {label}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please select an End Time.
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-3" controlId="endTime">
            <Button variant="secondary" onClick={closeHandler}>
              Close
            </Button>
            <Button type='submit' variant="primary">
              Add
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default BookModal;
