import { generateRandomHexaColor } from '../../../common/functions';
import { IBookedSlot } from '../../../common/types';

export const locationTwoBookedSlotsMock: IBookedSlot = {
  id: 'bookedSlot1',
  locationId: "locationOne",
  title: 'Booked 1',
  timeBlocksTaked: 1,
  positions: [1],
  style: {
    top: '0',
    height: '100px',
    backgroundColor: generateRandomHexaColor(),
  },
}