import type { StateCreator } from 'zustand'
import { indexBy, splice } from '~/utils'
import { Sequence } from './sequencer.types'
import sequences from './sequencer.data.json'
import { SequencerState } from './sequencer.types'
import { checkForActiveBars, len32, mergeSteps } from './sequencer.utils'

export const createSequencerSlice: StateCreator<SequencerState> = (set) => ({
  // state
  sequencerActiveBars: 1,
  sequencerBpm: 120,
  sequences: indexBy<Sequence>('id')(sequences as Sequence[]),
  selectedSequenceId: sequences[0].id,
  sequencerEdits: len32.map(() => ({ })),

  // actions
  selectSequenceById: (sequenceId: string) => set(() => ({ selectedSequenceId: sequenceId })),
  updateSequencerBpm: (n) => set(() => ({ sequencerBpm: n })),
  updateSequencerStep: (stepIndex, padId, value) => set((state) => {
    const editedStep = state.sequencerEdits[stepIndex]
    editedStep[padId] = !value
    
    const sequencerActiveBars = checkForActiveBars(
      mergeSteps(state.sequences[state.selectedSequenceId].steps, state.sequencerEdits),
    )

    return {
      sequencerEdits: splice(state.sequencerEdits, stepIndex, editedStep),
      sequencerActiveBars,
    }
  }),
})
