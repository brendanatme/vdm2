import type { StateCreator } from 'zustand'
import { ModalState } from './modal.types'

export const createModalSlice: StateCreator<ModalState> = (set) => ({
  // state
  aModalIsOpen: false,

  // actions
  setAModalIsOpen: (isOpen) => set({ aModalIsOpen: isOpen }),
})
