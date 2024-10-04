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
  hasEdits: (state: StoreState) => !!state.sequencerEdits
    .map((stepEdits) => Object.keys(stepEdits))
    .filter((keys) => keys.length)
    .length,

  // actions
  selectSequenceById: (state: StoreState) => state.selectSequenceById,
  updateBpm: (state: StoreState) => state.updateSequencerBpm,
  updateStep: (state: StoreState) => state.updateSequencerStep,
  saveSequence: (state: StoreState) => state.saveSequence,
}
