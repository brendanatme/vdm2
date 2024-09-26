import { createArrayFromLength } from '~/utils'
import { SequencerStepConfig } from './sequencer.types'

// number of pad IDs
const len16 = createArrayFromLength(16)

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
