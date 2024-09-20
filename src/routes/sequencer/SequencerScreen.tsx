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
import { ArrowButton } from '~/components/ArrowButton'

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

  /**
   * sequencer steps
   */
  const [stepPage, setStepPage] = React.useState<0 | 1>(0)
  const goToPage0 = React.useCallback(() => setStepPage(0), [])
  const goToPage1 = React.useCallback(() => setStepPage(1), [])

  return (
    <div className={_(uStyles.flex, uStyles.column, uStyles.rel)}>
      <div className={styles.body}>
        <SequencerSteps eventName={EVENT_NAME} page={stepPage} steps={steps} />
      </div>
      <div className={styles.footer}>
        <div className={_(uStyles.pageWidth, uStyles.narrow)}>
          <div className={_(uStyles.flex, uStyles.fullWidth)}>
            <div className={_(uStyles.flex, uStyles.basisThird, uStyles.start)}>
              <BpmInput large short />
            </div>
            <div className={_(uStyles.flex, uStyles.basisThird)}>
              <PlayButton
                isPlaying={sequencePlayer.isPlaying}
                play={sequencePlayer.play}
                stop={sequencePlayer.stop}
              />
            </div>
            <div className={_(uStyles.flex, uStyles.basisThird, uStyles.end)}>
              <span>PADS</span>
              <span>&nbsp;</span>

              <ArrowButton isDisabled={stepPage === 0} onClick={goToPage0} prev />
              <span>&nbsp;</span>
              <ArrowButton isDisabled={stepPage === 1} onClick={goToPage1} next />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
