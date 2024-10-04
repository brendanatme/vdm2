import { createArrayFromLength, sortBy } from '~/utils'
import { Sequence, SequenceTypes, SequencerStepConfig } from './sequencer.types'

// number of pad IDs
const len16 = createArrayFromLength(16)

export const len32 = createArrayFromLength(32)

export const checkForActiveBars = (steps: SequencerStepConfig[]): number => {
  // 1st bar in sequencer is always active.
  let activeBar = 1

  // We start by checking bar 2.
  let checkingBar = 2
  
  for (let i = 16; i < steps.length; i++) {
    const step = steps[i]

    // If the bar we're checking is already active,
    // we don't need to keep checking it; just return.
    if (activeBar === checkingBar) {
      break
    }

    for (let stepPadId of len16) {
      if (step[`${stepPadId}` as keyof SequencerStepConfig]) {
        activeBar = checkingBar
        break
      }
    }
  }

  return activeBar
}

export const mapAndSortSequences = (sequencesIndexed: Record<string, Sequence>): Sequence[] => sortBy<Sequence>('id')(Object.values(sequencesIndexed))

export const defaultSequenceTypeFilter = (kit: Sequence) => kit.type === SequenceTypes.Default

export const userSequenceTypeFilter = (kit: Sequence) => kit.type === SequenceTypes.User

export const mergeSteps = (steps: SequencerStepConfig[], edits: Partial<SequencerStepConfig>[]): SequencerStepConfig[] =>
  steps.map((step, i) => Object.assign({}, step, edits[i]))
