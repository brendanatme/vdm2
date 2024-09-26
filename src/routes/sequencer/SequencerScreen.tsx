import React from 'react'
import { State } from '~/state'
import { SequencerSteps } from './SequencerSteps'
import { SequencerControls } from './SequencerControls'


const STEP_CHANGED = 'sequencerStepChanged'

export function SequencerScreen() {
  const steps = State.useState(State.select.sequencer.steps)

  return (
    <div className="flex column rel">
      <div className="flex pageBody scrollable">
        <SequencerSteps stepChangedEventName={STEP_CHANGED} steps={steps} />
      </div>
      <div className="pageFooter">
        <SequencerControls stepChangedEventName={STEP_CHANGED} steps={steps} />
      </div>
    </div>
  )
}
