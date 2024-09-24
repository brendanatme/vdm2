import { createArrayFromLength } from '~/utils'
import { SequencerStepConfig } from './sequencer.types'

// number of pad IDs
const len16 = createArrayFromLength(16)

// 2 bars x 16 steps per bar
const len32 = createArrayFromLength(32)

export const generateSteps = (step: SequencerStepConfig): SequencerStepConfig[] =>
  len32.map(() => step)

export const checkForActiveBars = (steps: SequencerStepConfig[]): number => {
  // 1st bar in sequencer is always active.
  let activeBar = 1

  // We start by checking bar 1.
  let checkingBar = 1
  
  for (let i = 0; i < steps.length; i++) {
    const step = steps[i]
    
    // If we've reached step 16, we've begun checking bar 2
    if (i === 16) {
      checkingBar++
    }

    // If the bar we're checking is already active,
    // we don't need to keep checking it; just continue.
    if (activeBar === checkingBar) {
      continue
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
