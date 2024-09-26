import React from 'react'
import { useShallow } from 'zustand/react/shallow'
import { KitSwitcher } from '~/components/KitSwitcher'
import { useSequencePlayer } from '~/services/player'
import { publish } from '~/services/pubSub'
import { State } from '~/state'
import { BpmInput } from './BpmInput'
import { PlayButton } from './PlayButton'
import { SequencerSteps } from './SequencerSteps'


const STEP_CHANGED = 'sequencerStepChanged'

export function SequencerScreen() {
  /**
   * sequence player
   */
  const activeBars = State.useState(State.select.sequencer.activeBars)
  const bpm = State.useState(State.select.sequencer.bpm)
  const padsIndexed = State.useState(useShallow(State.select.kits.selectedKitPadsIndexed))
  const steps = State.useState(State.select.sequencer.steps)
  const emitStepChangeEvent = React.useCallback((stepIndex: number) => publish<number>(STEP_CHANGED, stepIndex), [])
  const sequencePlayer = useSequencePlayer({
    activeBars,
    bpm: !bpm ? 120 : bpm,
    onStepChange: emitStepChangeEvent,
    padsIndexed,
    steps,
  })

  return (
    <div className="flex column rel">
      <div className="flex pageBody scrollable">
        <SequencerSteps stepChangedEventName={STEP_CHANGED} steps={steps} />
      </div>
      <div className="pageFooter">
        <div className="pageWidth narrow">
          <div className="flex fullWidth between">
            <div className="flex">
              <KitSwitcher />
            </div>
            <div className="flex">
              <BpmInput large short />
              <span>&nbsp;</span>
              <PlayButton {...sequencePlayer} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
