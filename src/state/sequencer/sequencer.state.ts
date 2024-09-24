import type { StateCreator } from 'zustand'
import { splice } from '~/utils'
import sequencerStep from './sequencer.data.json'
import { SequencerState } from './sequencer.types'
import { checkForActiveBars, generateSteps } from './sequencer.utils'

export const createSequencerSlice: StateCreator<SequencerState> = (set) => ({
  // state
  sequencerActiveBars: 1,
  sequencerBpm: 120,
  sequencerSteps: generateSteps(sequencerStep),

  // actions
  updateSequencerBpm: (n) => set(() => ({ sequencerBpm: n })),
  updateSequencerStep: (stepIndex, padId) => set((state) => {
    const updatedSteps = splice(state.sequencerSteps, stepIndex, {
      ...state.sequencerSteps[stepIndex],
      [padId]: !state.sequencerSteps[stepIndex][padId],
    })
    const sequencerActiveBars = checkForActiveBars(updatedSteps)

    return {
      sequencerSteps: updatedSteps,
      sequencerActiveBars,
    }
  }),
})
