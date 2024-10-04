import React from 'react'
import { useShallow } from 'zustand/react/shallow'
import { Button } from '~/components/Button'
import { FormField } from '~/components/FormField'
import { KitSwitcher } from '~/components/KitSwitcher'
import { Modal, useModalState } from '~/components/Modal'
import { useSequencePlayer } from '~/services/player'
import { publish } from '~/services/pubSub'
import { SequencerStepConfig, State } from '~/state'
import { BpmInput } from '../BpmInput'
import { PlayButton } from '../PlayButton'
import { SequenceSwitcher } from '../SequenceSwitcher'
import { SaveSequenceForm } from '../SaveSequenceForm'

interface SequencerControlsProps {
  stepChangedEventName: string
  steps: SequencerStepConfig[]
}

export function SequencerControls({ stepChangedEventName, steps }: SequencerControlsProps) {
  /**
   * extra controls modal
   */
  const modal = useModalState()
  
  /**
   * sequence player
   */
  const activeBars = State.useState(State.select.sequencer.activeBars)
  const bpm = State.useState(State.select.sequencer.bpm)
  const padsIndexed = State.useState(useShallow(State.select.kits.selectedKitPadsIndexed))
  const emitStepChangeEvent = React.useCallback(
    (stepIndex: number) => publish<number>(stepChangedEventName, stepIndex),
    [stepChangedEventName],
  )

  const sequencePlayer = useSequencePlayer({
    activeBars,
    bpm: !bpm ? 120 : bpm,
    onStepChange: emitStepChangeEvent,
    padsIndexed,
    steps,
  })

  /**
   * control modal
   */
  const hasSequencerEdits = State.useState(useShallow(State.select.sequencer.hasEdits))

  return (
    <div className="pageWidth narrow">
      <div className="flex fullWidth between">
        <div className="flex">
          <PlayButton {...sequencePlayer} />
          <span>&nbsp;</span>
          <BpmInput large short />
        </div>
        <div className="flex">
          <Button
            isActive={modal.isOpen}
            label="More"
            onClick={modal.open}
          />
        </div>
      </div>
      <Modal id="SequencerControlsModal" heading="Sequencer Settings" {...modal}>
        <FormField>
          <KitSwitcher />
        </FormField>
        <FormField noFlex>
          <SequenceSwitcher />
          {hasSequencerEdits && (<p>(edited)</p>)}
        </FormField>
        {hasSequencerEdits && (
          <SaveSequenceForm onSuccess={modal.close} />
        )}
      </Modal>
    </div>
  )
}
