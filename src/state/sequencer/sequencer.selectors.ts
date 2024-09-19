import { StoreState } from '../types'

export const sequencerSelectors = {
  // state
  bpm: (state: StoreState) => state.sequencerBpm,
  steps: (state: StoreState) => state.sequencerSteps,

  // actions
  updateBpm: (state: StoreState) => state.updateSequencerBpm,
  updateStep: (state: StoreState) => state.updateSequencerStep,
}
