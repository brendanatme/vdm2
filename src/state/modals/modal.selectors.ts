import { StoreState } from '../types'

export const modalSelectors = {
  // state
  aModalIsOpen: (state: StoreState) => state.aModalIsOpen,

  // actions
  setAModalIsOpen: (state: StoreState) => state.setAModalIsOpen,
}
