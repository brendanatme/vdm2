import React from 'react'
import { useShallow } from 'zustand/react/shallow'
// @todo
// import { useCallbackCreator } from '~/hooks/useCallbackCreator'
import { Button } from '~/components/Button'
import { NumberInput } from '~/components/NumberInput'
import { useSequencePlayer } from '~/services/player'
import { publish } from '~/services/pubSub'
import { State } from '~/state'
import uStyles from '~/styles/core/utils.module.css'
import { _ } from '~/utils'
import { SequencerStep } from './SequencerStep'
import styles from './SequencerScreen.module.css'
import { PlayButton } from './PlayButton'

const EVENT_NAME = 'sequencerStepChanged'

export function SequencerScreen() {
  const bpm = State.useState(State.select.sequencer.bpm)
  const padsIndexed = State.useState(useShallow(State.select.kits.selectedKitPadsIndexed))
  const steps = State.useState(State.select.sequencer.steps)
  const updateBpm = State.useState(State.select.sequencer.updateBpm)
  const updateStep = State.useState(State.select.sequencer.updateStep)

  const updateStepPad = React.useCallback(updateStep, [])

  const getStepIndex = React.useCallback((stepIndex: number) => publish<number>(EVENT_NAME, stepIndex), [])

  const handleBpmChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>, n?: number) => updateBpm(n), [])

  const sequencePlayer = useSequencePlayer({ bpm: !bpm ? 120 : bpm, onStepChange: getStepIndex, padsIndexed, steps })

  return (
    <div className={_(uStyles.flex, uStyles.column, uStyles.rel)}>
      <div className={styles.body}>
        <div className={_(uStyles.pageWidth, uStyles.narrow)}>
          <div className={styles.group}>
            {steps.map((step, i) => (
              <SequencerStep
                config={step}
                eventName={EVENT_NAME}
                index={i}
                key={`${i}`}
                onClick={updateStepPad}
                showLabel={i === 0}
              />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={_(uStyles.pageWidth, uStyles.narrow)}>
          <div className={_(uStyles.flex, uStyles.fullWidth)}>
            <div className={_(uStyles.flex, uStyles.basisThird, uStyles.start)}>
              <NumberInput large name="bpm" onChange={handleBpmChange} short value={bpm} />
              <span>&nbsp;</span>
              BPM
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
              <span>&lt;</span>
              <span>&nbsp;</span>
              <span>&gt;</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
