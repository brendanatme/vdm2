import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { kitSelectors } from './kits/kit.selectors'
import { createKitSlice } from './kits/kit.state'
import { modalSelectors } from './modals/modal.selectors'
import { createModalSlice } from './modals/modal.state'
import { padSelectors } from './pads/pad.selectors'
import { createPadSlice } from './pads/pad.state'
import { StoreState } from './types'

export type { Kit, KitPad } from './kits/kit.types'
export type { Pad } from './pads/pad.types'

export const State = {
  useState: create<StoreState, [["zustand/persist", StoreState]]>(
    persist(
      (...a) => ({
        ...createKitSlice(...a),
        ...createModalSlice(...a),
        ...createPadSlice(...a),
      }),
      { name: '__UI_STATE__' },
    ),
  ),
  select: {
    kits: kitSelectors,
    modals: modalSelectors,
    pads: padSelectors,
  },
}


