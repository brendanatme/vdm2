import type { StateCreator } from 'zustand'
import { indexBy, sortBy } from '~/utils'
import kits from './kit.data.json'
import { Kit, KitPad, KitState, KitTypes } from './kit.types'
import { getSelectedKitPadsAndEditsIndexed } from './kit.utils'

export const createKitSlice: StateCreator<KitState> = (set) => ({
  // state
  kits: indexBy<Kit>('id')(kits as Kit[]),
  selectedKitId: kits[0].id,
  editKitMode: false,
  kitPadEdits: {},

  // actions
  selectKitById: (kitId) => set((state) => ({
    // if we're switching kits, clear edits
    kitPadEdits: kitId !== state.selectedKitId ? {} : state.kitPadEdits,
    selectedKitId: kitId,
  })),
  setKits: (kits) => set(() => ({ kits: indexBy<Kit>('id')(kits) })),
  enableEditKitMode: () => set(() => ({ editKitMode: true })),
  disableEditKitMode: () => set(() => ({ editKitMode: false })),
  toggleEditKitMode: () => set((state) => ({ editKitMode: !state.editKitMode })),
  editKitPad: (padId, changes) => set((state) => {
    return {
      kitPadEdits: {
        ...state.kitPadEdits,
        [padId]: {
          ...state.kitPadEdits[padId] || {},
          ...changes,
        },
      },
    }
  }),
  
  /**
   * Using kit name, selected kit, and kit edits,
   * create a new kit, select it, and clear edits.
   */
  saveKit: (kitName) => set((state) => {
    const selectedKitPadsAndEditsIndexed = getSelectedKitPadsAndEditsIndexed(state)
    
    const kit: Kit = {
      id: kitName,
      name: kitName,
      type: KitTypes.User,
      pads: sortBy<KitPad>('id')(Object.values(selectedKitPadsAndEditsIndexed)),
    }

    return {
      kitPadEdits: {},
      selectedKitId: kit.id,
      kits: {
        ...state.kits,
        [kit.id]: kit,
      }
    }
  })
})
