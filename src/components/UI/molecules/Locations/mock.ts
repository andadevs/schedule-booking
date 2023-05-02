import { ILocation, ISlot } from "../../../../common/types";

const locationOneSlotMock: ISlot[] = [
  {
    id: 'slot1',
    title: '',
    position: 1,
  },
  {
    id: 'slot2',
    title: '',
    position: 2,
  },
  {
    id: 'slot3',
    title: '',
    position: 3,
  },
  {
    id: 'slot4',
    title: '',
    position: 4,
  },
  {
    id: 'slot5',
    title: '',
    position: 5,
  },
  {
    id: 'slot6',
    title: '',
    position: 6,
  },
  {
    id: 'slot7',
    title: '',
    position: 7,
  },
];

const locationTwoSlotMock: ISlot[] = [
  {
    id: 'l2slot1',
    title: '',
    position: 1,
  },
  {
    id: 'l2slot2',
    title: '',
    position: 2,
  },
  {
    id: 'l2slot3',
    title: '',
    position: 3,
  },
  {
    id: 'l2slot4',
    title: '',
    position: 4,
  },
  {
    id: 'l2slot5',
    title: '',
    position: 5,
  },
  {
    id: 'l2slot6',
    title: '',
    position: 6,
  },
  {
    id: 'l2slot7',
    title: '',
    position: 7,
  },
];

const locationThreeSlotMock: ISlot[] = [
  {
    id: 'l3slot1',
    title: '',
    position: 1,
  },
  {
    id: 'l3slot2',
    title: '',
    position: 2,
  },
  {
    id: 'l3slot3',
    title: '',
    position: 3,
  },
  {
    id: 'l3slot4',
    title: '',
    position: 4,
  },
  {
    id: 'l3slot5',
    title: '',
    position: 5,
  },
  {
    id: 'l3slot6',
    title: '',
    position: 6,
  },
  {
    id: 'l3slot7',
    title: '',
    position: 7,
  },
];

const locationOneMock: ILocation = {
  id: 'locationOne',
  title: 'Location 1',
  slots: locationOneSlotMock,
  slotsBooked: []
};

const locationTwoMock: ILocation = {
  id: 'locationTwo',
  title: 'Location 2',
  slots: locationTwoSlotMock,
  slotsBooked: []
};

const locationThreeMock: ILocation = {
  id: 'locationThree',
  title: 'Location 3',
  slots: locationThreeSlotMock,
  slotsBooked: []
};

export const locationsMock: ILocation[] = [{ ...locationOneMock }, { ...locationTwoMock }, { ...locationThreeMock }];
