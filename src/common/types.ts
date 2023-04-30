import { CSSProperties } from 'react';

export interface ISlot {
  id: string;
  title: string;
  position: number;
}

export interface ILocation {
  id: string;
  title: string;
  slots: ISlot[];
}

export interface IBookedSlot {
  id: string;
  title: string;
  positions: number;
  style: CSSProperties;
}

export interface ITimeBlock {
  value: string;
  position: number;
  label: string;
  disabled: boolean;
}