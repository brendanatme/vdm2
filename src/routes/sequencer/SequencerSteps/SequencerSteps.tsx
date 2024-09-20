import React from 'react'
import { ArrowButton } from '~/components/ArrowButton'
import { SequencerStepConfig, State } from '~/state'
import uStyles from '~/styles/core/utils.module.css'
import { _ } from '~/utils'
import { SequencerStep } from '../SequencerStep'
import styles from './SequencerSteps.module.css'

interface SequencerStepsProps {
  eventName: string
  steps: SequencerStepConfig[]
}

export function SequencerSteps({ eventName, steps }: SequencerStepsProps) {
  const updateStep = State.useState(State.select.sequencer.updateStep)

  const updateStepPad = React.useCallback(updateStep, [updateStep])

  /**
   * sequencer step pages
   */
  const [page, setPage] = React.useState<0 | 1>(0)
  const goToPage0 = React.useCallback(() => setPage(0), [])
  const goToPage1 = React.useCallback(() => setPage(1), [])

  return (
    <div className={_(uStyles.pageWidth, uStyles.narrow, styles.component)}>
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
      <div className={styles.controls}>
        <ArrowButton isDisabled={page === 0} onClick={goToPage0} prev />
        <span>&nbsp;</span>
        <ArrowButton isDisabled={page === 1} onClick={goToPage1} next />
      </div>
    </div>
  )
}
