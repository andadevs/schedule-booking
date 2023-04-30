import { generateRandomHexaColor } from '../../../common/functions';
import { IBookedSlot } from '../../../common/types';

export const bookedSlotsMock: IBookedSlot[] = [
  {
    id: 'bookedSlot1',
    title: 'Booked 1',
    positions: 2,
    style: {
      top: '0',
      height: '228px',
      backgroundColor: generateRandomHexaColor(),
    },
  },
];
