import React from 'react'
import { SequencerStepConfig, State } from '~/state'
import uStyles from '~/styles/core/utils.module.css'
import { _ } from '~/utils'
import { SequencerStep } from '../SequencerStep'
import styles from './SequencerSteps.module.css'

interface SequencerStepsProps {
  eventName: string
  page: 0 | 1
  steps: SequencerStepConfig[]
}

export function SequencerSteps({ eventName, page, steps }: SequencerStepsProps) {
  const updateStep = State.useState(State.select.sequencer.updateStep)

  const updateStepPad = React.useCallback(updateStep, [])

  return (
    <div className={_(uStyles.pageWidth, uStyles.narrow)}>
      <div className={styles.container}>
        <div className={_(styles.group, styles[`page${page}`])}>
          {steps.map((step, i) => (
            <SequencerStep
              config={step}
              eventName={eventName}
              index={i}
              key={`${i}`}
              onClick={updateStepPad}
              showLabel={i === 0}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
