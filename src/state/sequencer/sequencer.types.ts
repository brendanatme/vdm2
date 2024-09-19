
// using padIds as keys
export interface SequencerStepConfig {
  ["13"]: boolean
  ["14"]: boolean
  ["15"]: boolean
  ["16"]: boolean
  ["9"]: boolean
  ["10"]: boolean
  ["11"]: boolean
  ["12"]: boolean
}

export interface SequencerState {
  // state
  sequencerBpm: number | undefined
  sequencerSteps: SequencerStepConfig[]

  // actions
  updateSequencerBpm: (n: number | undefined) => void
  updateSequencerStep: (stepIndex: number, padId: keyof SequencerStepConfig) => void
}

