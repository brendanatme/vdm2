import React from 'react'
import { ArrowButton } from '~/components/ArrowButton'
import { useDragHandler } from '~/hooks/useDragHandler'
import { publish } from '~/services/pubSub'
import { SequencerStepConfig } from '~/state'
import { _ } from '~/utils'
import { SequencerStep } from '../SequencerStep'
import styles from './SequencerSteps.module.css'
import { Square } from '~/components/Square'

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
  const [padPage, setPadPage] = React.useState<0 | 1>(0)
  const [stepPage, setStepPage] = React.useState<0 | 1>(0)
  const goToPadPage0 = React.useCallback(() => setPadPage(0), [])
  const goToPadPage1 = React.useCallback(() => setPadPage(1), [])
  const goToStepPage0 = React.useCallback(() => setStepPage(0), [])
  const goToStepPage1 = React.useCallback(() => setStepPage(1), [])

  return (
    <div className={_('pageWidth', 'narrow', styles.component)}>
      <div className={styles.container}>
        <Square ratio="oneFifty">
          <div
            className={_(styles.group, styles[`padPage${padPage}`], styles[`stepPage${stepPage}`])}
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
                showLabel={i === 0 || i === 16}
                stepChangedEventName={stepChangedEventName}
              />
            ))}
          </div>
        </Square>
      </div>
      <div className={_('flex', 'between', styles.controls)}>
        <div className="flex">
          <ArrowButton isDisabled={stepPage === 0} onClick={goToStepPage0} point="up" />
          <span>&nbsp;</span>
          <ArrowButton isDisabled={stepPage === 1} onClick={goToStepPage1} point="down" />
        </div>
        
        <div className="flex">
          <ArrowButton isDisabled={padPage === 0} onClick={goToPadPage0} point="left" />
          <span>&nbsp;</span>
          <ArrowButton isDisabled={padPage === 1} onClick={goToPadPage1} point="right" />
        </div>
      </div>
    </div>
  )
}
