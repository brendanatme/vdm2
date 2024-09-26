
// using padIds as keys
export interface SequencerStepConfig {
  // bottom row of pads
  ["13"]: boolean
  ["14"]: boolean
  ["15"]: boolean
  ["16"]: boolean

  // second-from-bottom row of pads
  ["9"]: boolean
  ["10"]: boolean
  ["11"]: boolean
  ["12"]: boolean

  // third-from-bottom row of pads
  ["5"]: boolean
  ["6"]: boolean
  ["7"]: boolean
  ["8"]: boolean

  // top row of pads
  ["1"]: boolean
  ["2"]: boolean
  ["3"]: boolean
  ["4"]: boolean
}

export type SequenceType = 'default' | 'user'

export enum SequenceTypes {
  Default = 'default',
  User = 'user',
}

export interface Sequence {
  id: string
  name: string
  steps: SequencerStepConfig[]
  type: SequenceType
}

export interface SequencerState {
  // state
  sequences: Record<string, Sequence>
  selectedSequenceId: string
  sequencerActiveBars: number
  sequencerBpm: number | undefined

  // actions
  selectSequenceById: (id: string) => void
  updateSequencerBpm: (n: number | undefined) => void
  updateSequencerStep: (stepIndex: number, padId: keyof SequencerStepConfig) => void
}

