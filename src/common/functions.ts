import { IBookedSlot, ILocation, ITimeBlock } from "./types";

//#Supporteed from Source https://bit.ly/2neWfJ2
export const generateRandomHexaColor = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};

export const setBookedSlotToLocation = (
  locations: ILocation[],
  bookedSlot: IBookedSlot): ILocation[] => {
  let arrayWithElement: ILocation[] = [];

  if (locations.length > 0) {
    //TODO: Change search logic to Bynary Search strategy
    const locationsWithOutSearched = locations.filter((ele) => ele.id !== bookedSlot.locationId)
    const locationSearched = locations.filter((ele) => ele.id === bookedSlot.locationId)[0]
    let slotsBooked = [...locationSearched.slotsBooked, bookedSlot]

    const locationWithBookedSlot = {
      ...locationSearched,
      slotsBooked
    }
    arrayWithElement = [...locationsWithOutSearched, locationWithBookedSlot]
  }
  return arrayWithElement.sort((a, b) => a.title > b.title ? 0 : -1)
}

export const updateTimeBlockStatus = (location: ILocation, timeBlocks: ITimeBlock[]) => {
  let timeBlocksUpdated: ITimeBlock[] = [];
  let locationsPositions: number[] = [];
  const {slotsBooked} = location;

  if (slotsBooked.length > 0) {
    slotsBooked.map(({ positions }) => {
      positions.map((pos) => {
        locationsPositions.push(pos)
      })
    })
  }

  timeBlocks.map((ele) => {
    const {position} = ele;
    const newTimeBlok: ITimeBlock = {
      ...ele,
      disabled: locationsPositions.includes(position)
    };

    timeBlocksUpdated.push(newTimeBlok);
  });

  return timeBlocksUpdated;
}