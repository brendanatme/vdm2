import type { StateCreator } from 'zustand'
import { indexBy } from '~/utils'
import padData from './pad.data.json'
import { Pad, PadState } from './pad.types'

export const createPadSlice: StateCreator<PadState> = () => ({
  // state
  padsIndexed: indexBy<Pad>('id')(padData),
  padIds: padData.map((pad) => pad.id),
})
