import { StoreState } from '../types'

export const sequencerSelectors = {
  // state
  activeBars: ( state: StoreState) => state.sequencerActiveBars,
  bpm: (state: StoreState) => state.sequencerBpm,
  steps: (state: StoreState) => state.sequences[state.selectedSequenceId]?.steps ?? [],

  // actions
  updateBpm: (state: StoreState) => state.updateSequencerBpm,
  updateStep: (state: StoreState) => state.updateSequencerStep,
}
