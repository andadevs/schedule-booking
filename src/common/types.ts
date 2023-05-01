import { CSSProperties } from 'react';

export interface ISlot {
  id: string;
  title: string;
  position: number;
}

export interface IBookedSlot {
  id: string;
  title: string;
  timeBlocksTaked: number;
  style: CSSProperties;
  locationId: string;
  positions: number[]
}
export interface ILocation {
  id: string;
  title: string;
  slots: ISlot[];
  slotsBooked: IBookedSlot[]
}

export interface ITimeBlock {
  value: string;
  position: number;
  label: string;
  disabled: boolean;
}