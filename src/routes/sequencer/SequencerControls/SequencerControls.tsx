import React from 'react'
import { useShallow } from 'zustand/react/shallow'
import { useSequencePlayer } from '~/services/player'
import { publish } from '~/services/pubSub'
import { SequencerStepConfig, State } from '~/state'
import { KitSwitcher } from '~/components/KitSwitcher'
import { BpmInput } from '../BpmInput'
import { PlayButton } from '../PlayButton'

interface SequencerControlsProps {
  stepChangedEventName: string
  steps: SequencerStepConfig[]
}

export function SequencerControls({ stepChangedEventName, steps }: SequencerControlsProps) {
  /**
   * sequence player
   */
  const activeBars = State.useState(State.select.sequencer.activeBars)
  const bpm = State.useState(State.select.sequencer.bpm)
  const padsIndexed = State.useState(useShallow(State.select.kits.selectedKitPadsIndexed))
  const emitStepChangeEvent = React.useCallback((stepIndex: number) => publish<number>(stepChangedEventName, stepIndex), [])

  const sequencePlayer = useSequencePlayer({
    activeBars,
    bpm: !bpm ? 120 : bpm,
    onStepChange: emitStepChangeEvent,
    padsIndexed,
    steps,
  })

  return (
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
  )
}
