import React from 'react'
import { ArrowButton } from '~/components/ArrowButton'
import { useDragHandler } from '~/hooks/useDragHandler'
import { publish } from '~/services/pubSub'
import { SequencerStepConfig } from '~/state'
import uStyles from '~/styles/core/utils.module.css'
import { _ } from '~/utils'
import { SequencerStep } from '../SequencerStep'
import styles from './SequencerSteps.module.css'

interface SequencerStepsProps {
  stepChangedEventName: string
  steps: SequencerStepConfig[]
}

const DRAG_STARTED = 'dragStarted'
const DRAG_MOVED = 'dragMoved'
const DRAG_ENDED = 'dragEnded'

export function SequencerSteps({ stepChangedEventName, steps }: SequencerStepsProps) {
  /**
   * Use drag handler to toggle on/off individual step pads.
   * This way, users can drag mouse/touch across sequencer
   * to turn on a batch of pads.
   */
  const onDragStart = React.useCallback(
    (e: React.MouseEvent | React.TouchEvent) => publish<React.MouseEvent | React.TouchEvent>(DRAG_STARTED, e),
    [],
  )
  const onDrag = React.useCallback(
    (e: MouseEvent | TouchEvent) => publish<MouseEvent | TouchEvent>(DRAG_MOVED, e),
    [],
  )
  const onDragEnd = React.useCallback(
    (e: MouseEvent | TouchEvent) => publish<MouseEvent | TouchEvent>(DRAG_ENDED, e),
    [],
  )
  const dragHandler = useDragHandler({ onDragStart, onDrag, onDragEnd })

  /**
   * sequencer step pages
   */
  const [page, setPage] = React.useState<0 | 1>(0)
  const goToPage0 = React.useCallback(() => setPage(0), [])
  const goToPage1 = React.useCallback(() => setPage(1), [])

  return (
    <div className={_(uStyles.pageWidth, uStyles.narrow, styles.component)}>
      <div className={styles.container}>
        <div
          className={_(styles.group, styles[`page${page}`])}
          {...dragHandler}
        >
          {steps.map((step, i) => (
            <SequencerStep
              config={step}
              dragEndedEventName={DRAG_ENDED}
              dragMovedEventName={DRAG_MOVED}
              dragStartedEventName={DRAG_STARTED}
              index={i}
              key={`${i}`}
              showLabel={i === 0}
              stepChangedEventName={stepChangedEventName}
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
