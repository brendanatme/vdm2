import { StoreState } from '../types'
import {
  mapAndSortSequences,
  userSequenceTypeFilter,
  defaultSequenceTypeFilter,
  mergeSteps,
} from './sequencer.utils'

export const sequencerSelectors = {
  // state
  activeBars: ( state: StoreState) => state.sequencerActiveBars,
  bpm: (state: StoreState) => state.sequencerBpm,
  selectedSequence: (state: StoreState) => state.sequences[state.selectedSequenceId],
  steps: (state: StoreState) => mergeSteps(state.sequences[state.selectedSequenceId].steps, state.sequencerEdits),
  userSequences: (state: StoreState) => mapAndSortSequences(state.sequences).filter(userSequenceTypeFilter),
  defaultSequences: (state: StoreState) => mapAndSortSequences(state.sequences).filter(defaultSequenceTypeFilter),

  // actions
  selectSequenceById: (state: StoreState) => state.selectSequenceById,
  updateBpm: (state: StoreState) => state.updateSequencerBpm,
  updateStep: (state: StoreState) => state.updateSequencerStep,
}
