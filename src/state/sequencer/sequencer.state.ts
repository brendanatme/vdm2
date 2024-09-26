import type { StateCreator } from 'zustand'
import { indexBy, splice } from '~/utils'
import { Sequence } from './sequencer.types'
import sequences from './sequencer.data.json'
import { SequencerState } from './sequencer.types'
import { checkForActiveBars } from './sequencer.utils'

export const createSequencerSlice: StateCreator<SequencerState> = (set) => ({
  // state
  sequencerActiveBars: 1,
  sequencerBpm: 120,
  sequences: indexBy<Sequence>('id')(sequences as Sequence[]),
  selectedSequenceId: sequences[0].id,

  // actions
  updateSequencerBpm: (n) => set(() => ({ sequencerBpm: n })),
  updateSequencerStep: (stepIndex, padId) => set((state) => {
    const sequence = state.sequences[state.selectedSequenceId]
    const steps = sequence.steps
    const updatedSteps = splice(steps, stepIndex, {
      ...steps[stepIndex],
      [padId]: !steps[stepIndex][padId],
    })
    const sequencerActiveBars = checkForActiveBars(updatedSteps)

    return {
      sequences: {
        ...state.sequences,
        [state.selectedSequenceId]: {
          ...sequence,
          steps: updatedSteps,
        }
      },
      sequencerActiveBars,
    }
  }),
})
