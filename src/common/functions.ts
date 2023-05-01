import { IBookedSlot, ILocation } from "./types";

//#Supporteed from Source https://bit.ly/2neWfJ2
export const generateRandomHexaColor = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};

export const setBookedSlotToLocation = (
  locations: ILocation[],
  bookedSlot: IBookedSlot): ILocation[] => {
    let arrayWithElement: ILocation[] = [];

    if(locations.length > 0) {
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