import type { StateCreator } from 'zustand'
import { splice } from '~/utils'
import sequencerSteps from './sequencer.data.json'
import { SequencerState } from './sequencer.types'

export const createSequencerSlice: StateCreator<SequencerState> = (set) => ({
  // state
  sequencerBpm: 120,
  sequencerSteps,

  // actions
  updateSequencerBpm: (n) => set(() => ({ sequencerBpm: n })),
  updateSequencerStep: (stepIndex, padId) => set(
    (state) => ({
      sequencerSteps: splice(state.sequencerSteps, stepIndex, {
        ...state.sequencerSteps[stepIndex],
        [padId]: !state.sequencerSteps[stepIndex][padId],
      }),
    })
  ),
})
