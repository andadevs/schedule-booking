import * as React from 'react';
import { useState, useEffect } from 'react';

import {
  IBookedSlot,
  ILocation,
  ITimeBlock,
} from '../../../../common/types';
import { IBookModalProp } from "./type"
import { generateRandomHexaColor } from '../../../../common/functions';
import { timeBlocksMock } from '../../../../common/mock';

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
  const [timesBlock, setTimBlock] = useState<ITimeBlock[]>([]);

  useEffect(() => {
    setShow(showModal);
  }, [showModal]);

  useEffect(() => {
    if (locations.length > 0) setDropLocations(locations);
  }, [locations]);

  useEffect(() => {
    setTimBlock(timeBlocksMock);
  }, [timeBlocksMock]);

  const closeHandler = () => {
    setShow(false);
    updateModalState();
  };

  const saveHandler = () => {
    setShow(false);

    const newBookedSlot: IBookedSlot = {
      id: 'bookedSlot3',
      title: 'Booked 3',
      positions: 1,
      style: {
        top: '456px',
        height: '114.5px',
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
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Select a Location</Form.Label>
            <Form.Select aria-label="Select a Location">
              <option>List of Locations</option>
              {dropLocations.map(({ id, title }) => (
                <option value={id} key={id}>
                  {title}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Select a Start Time</Form.Label>
            <Form.Select aria-label="Select a Location">
              <option>List of Start Time</option>
              {timesBlock.map(({ value, label, disabled }) => (
                <option value={value} disabled={disabled} key={label}>
                  {label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Select a End Time</Form.Label>
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
