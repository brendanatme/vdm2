import React from 'react'
import { useShallow } from 'zustand/react/shallow'
import { useSequencePlayer } from '~/services/player'
import { publish } from '~/services/pubSub'
import { State } from '~/state'
import uStyles from '~/styles/core/utils.module.css'
import { _ } from '~/utils'
import { BpmInput } from './BpmInput'
import { PlayButton } from './PlayButton'
import { SequencerSteps } from './SequencerSteps'
import styles from './SequencerScreen.module.css'
import { KitSwitcher } from '../pads/KitControls/KitSwitcher'


const EVENT_NAME = 'sequencerStepChanged'

export function SequencerScreen() {
  /**
   * sequence player
   */
  const bpm = State.useState(State.select.sequencer.bpm)
  const padsIndexed = State.useState(useShallow(State.select.kits.selectedKitPadsIndexed))
  const steps = State.useState(State.select.sequencer.steps)
  const emitStepChangeEvent = React.useCallback((stepIndex: number) => publish<number>(EVENT_NAME, stepIndex), [])
  const sequencePlayer = useSequencePlayer({
    bpm: !bpm ? 120 : bpm,
    onStepChange: emitStepChangeEvent,
    padsIndexed,
    steps,
  })

  return (
    <div className={_(uStyles.flex, uStyles.column, uStyles.rel)}>
      <div className={styles.body}>
        <SequencerSteps eventName={EVENT_NAME} steps={steps} />
      </div>
      <div className={styles.footer}>
        <div className={_(uStyles.pageWidth, uStyles.narrow)}>
          <div className={_(uStyles.flex, uStyles.fullWidth, uStyles.between)}>
            <div className={_(uStyles.flex)}>
              <KitSwitcher />
            </div>
            <div className={_(uStyles.flex)}>
              <BpmInput large short />
              <span>&nbsp;</span>
              <PlayButton
                isPlaying={sequencePlayer.isPlaying}
                play={sequencePlayer.play}
                stop={sequencePlayer.stop}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
