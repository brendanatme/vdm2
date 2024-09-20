import React from 'react'
import { Square } from '~/components/Square'
import { getNormalizedEventProp } from '~/services/normalizedEvents'
import { subscribe, unsubscribe } from '~/services/pubSub'
import { SequencerStepConfig, State } from '~/state'
import { _ } from '~/utils'
import uStyles from '~/styles/core/utils.module.css'
import styles from './SequencerStepPad.module.css'

interface SequencerStepPadProps {
  dragEndedEventName: string
  dragMovedEventName: string
  dragStartedEventName: string
  isActive: boolean
  isHighlighted: boolean
  padId: keyof SequencerStepConfig
  showLabel: boolean
  step: number
}

const getClientX = getNormalizedEventProp<number>('clientX')
const getClientY = getNormalizedEventProp<number>('clientY')

export const SequencerStepPad = React.memo(function SequencerStepPad({
  dragEndedEventName,
  dragMovedEventName,
  dragStartedEventName,
  isActive,
  isHighlighted,
  padId,
  showLabel,
  step,
}: SequencerStepPadProps) {
  const domEl = React.useRef<HTMLDivElement>(null)
  const didUpdate = React.useRef<boolean>(false)
  
  const updateStep = State.useState(State.select.sequencer.updateStep)
  const keyName = State.useState(State.select.pads.getKeyNameByPadId(padId))

  const isOnElement = React.useCallback(
    (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
      const element = document.elementFromPoint(getClientX(e), getClientY(e))
      return domEl.current?.contains(element)
    },
    [],
  )

  const update = React.useCallback(
    (e: CustomEvent<React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent>) => {
      if (isOnElement(e.detail) && !didUpdate.current) {
        didUpdate.current = true
        updateStep(step, padId)
      }
    },
    [isOnElement, updateStep, step, padId],
  )

  const resetDragTracking = React.useCallback(() => {
    didUpdate.current = false
  }, [])
  
  React.useEffect(() => {
    subscribe<React.MouseEvent | React.TouchEvent>(dragStartedEventName, update)
    return () => unsubscribe<React.MouseEvent | React.TouchEvent>(dragStartedEventName, update)
  }, [dragStartedEventName, update])

  React.useEffect(() => {
    subscribe<React.MouseEvent | React.TouchEvent>(dragMovedEventName, update)
    return () => unsubscribe<React.MouseEvent | React.TouchEvent>(dragMovedEventName, update)
  }, [dragMovedEventName, update])

  React.useEffect(() => {
    subscribe<React.MouseEvent | React.TouchEvent>(dragEndedEventName, resetDragTracking)
    return () => unsubscribe<React.MouseEvent | React.TouchEvent>(dragEndedEventName, resetDragTracking)
  }, [dragEndedEventName, resetDragTracking])

  return (
    <div
      className={_(uStyles.ui, styles.stepPad, styles[`step${step}`])}
      ref={domEl}
    >
      <Square
        className={_(
          styles.stepPadSquare,
          isActive ? styles.isActive : '',
          isHighlighted ? styles.isHighlighted : ''
        )}
        ratioClass="ratioThreeQuarters"
      >
        {showLabel ? keyName : ''}
      </Square>
    </div>
  )
})
