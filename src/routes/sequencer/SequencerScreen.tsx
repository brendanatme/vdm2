import React from 'react'
import { useShallow } from 'zustand/react/shallow'
import { KitSwitcher } from '~/components/KitSwitcher'
import { useSequencePlayer } from '~/services/player'
import { publish } from '~/services/pubSub'
import { State } from '~/state'
import { _ } from '~/utils'
import { BpmInput } from './BpmInput'
import { PlayButton } from './PlayButton'
import { SequencerSteps } from './SequencerSteps'
import styles from './SequencerScreen.module.css'


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
    <div className={_('flex', 'column', 'rel')}>
      <div className={_('flex', styles.body)}>
        <SequencerSteps stepChangedEventName={STEP_CHANGED} steps={steps} />
      </div>
      <div className={styles.footer}>
        <div className={_('pageWidth', 'narrow')}>
          <div className={_('flex', 'fullWidth', 'between')}>
            <div className={_('flex')}>
              <KitSwitcher />
            </div>
            <div className={_('flex')}>
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
