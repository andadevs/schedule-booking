import { ILocation, IBookedSlot} from "../../../../common/types"

export interface IBookModalProp {
    showModal: boolean;
    locations: ILocation[];
    updateModalState(): void;
    addHandler(bookedSlot: IBookedSlot): void;
  }