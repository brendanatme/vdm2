import type { StateCreator } from 'zustand'
import { splice } from '~/utils'
import sequencerStep from './sequencer.data.json'
import { SequencerState } from './sequencer.types'
import { generateSteps } from './sequencer.utils'

export const createSequencerSlice: StateCreator<SequencerState> = (set) => ({
  // state
  sequencerBars: 2,
  sequencerBpm: 120,
  sequencerSteps: generateSteps(sequencerStep, 2),

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
