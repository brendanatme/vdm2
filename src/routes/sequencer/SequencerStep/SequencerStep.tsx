import React from 'react'
import { subscribe, unsubscribe } from '~/services/pubSub'
import { SequencerStepConfig } from '~/state'
import { _, isEqual } from '~/utils'
import { SequencerStepPad } from '../SequencerStepPad'
import styles from './SequencerStep.module.css'

interface SequencerStepProps {
  config: SequencerStepConfig
  dragEndedEventName: string
  dragMovedEventName: string
  dragStartedEventName: string
  stepChangedEventName: string
  index: number
  showLabel?: boolean
}

export const SequencerStep = React.memo(function SequencerStep({
  config,
  dragEndedEventName,
  dragMovedEventName,
  dragStartedEventName,
  stepChangedEventName,
  index,
  showLabel = false,
}: SequencerStepProps) {
  const [isHighlighted, setIsHighlighted] = React.useState(index === 0)

  const highlight = React.useCallback((e: CustomEvent<number>) => setIsHighlighted(e.detail === index), [index])
  
  React.useEffect(() => {
    subscribe<number>(stepChangedEventName, highlight)
    return () => unsubscribe<number>(stepChangedEventName, highlight)
  }, [highlight, stepChangedEventName])

  return (
    <div className={_(styles.container, isHighlighted ? styles.highlight : '')}>
      <SequencerStepPad
        dragEndedEventName={dragEndedEventName}
        dragMovedEventName={dragMovedEventName}
        dragStartedEventName={dragStartedEventName}
        isActive={config["13"]}
        isHighlighted={isHighlighted}
        padId="13"
        showLabel={showLabel}
        step={index}
      />
      <SequencerStepPad
        dragEndedEventName={dragEndedEventName}
        dragMovedEventName={dragMovedEventName}
        dragStartedEventName={dragStartedEventName}
        isActive={config["14"]}
        isHighlighted={isHighlighted}
        padId="14"
        showLabel={showLabel}
        step={index}
      />
      <SequencerStepPad
        dragEndedEventName={dragEndedEventName}
        dragMovedEventName={dragMovedEventName}
        dragStartedEventName={dragStartedEventName}
        isActive={config["15"]}
        isHighlighted={isHighlighted}
        padId="15"
        showLabel={showLabel}
        step={index}
      />
      <SequencerStepPad
        dragEndedEventName={dragEndedEventName}
        dragMovedEventName={dragMovedEventName}
        dragStartedEventName={dragStartedEventName}
        isActive={config["16"]}
        isHighlighted={isHighlighted}
        padId="16"
        showLabel={showLabel}
        step={index}
      />
      <SequencerStepPad
        dragEndedEventName={dragEndedEventName}
        dragMovedEventName={dragMovedEventName}
        dragStartedEventName={dragStartedEventName}
        isActive={config["9"]}
        isHighlighted={isHighlighted}
        padId="9"
        showLabel={showLabel}
        step={index}
      />
      <SequencerStepPad
        dragEndedEventName={dragEndedEventName}
        dragMovedEventName={dragMovedEventName}
        dragStartedEventName={dragStartedEventName}
        isActive={config["10"]}
        isHighlighted={isHighlighted}
        padId="10"
        showLabel={showLabel}
        step={index}
      />
      <SequencerStepPad
        dragEndedEventName={dragEndedEventName}
        dragMovedEventName={dragMovedEventName}
        dragStartedEventName={dragStartedEventName}
        isActive={config["11"]}
        isHighlighted={isHighlighted}
        padId="11"
        showLabel={showLabel}
        step={index}
      />
      <SequencerStepPad
        dragEndedEventName={dragEndedEventName}
        dragMovedEventName={dragMovedEventName}
        dragStartedEventName={dragStartedEventName}
        isActive={config["12"]}
        isHighlighted={isHighlighted}
        padId="12"
        showLabel={showLabel}
        step={index}
      />
      <SequencerStepPad
        dragEndedEventName={dragEndedEventName}
        dragMovedEventName={dragMovedEventName}
        dragStartedEventName={dragStartedEventName}
        isActive={config["5"]}
        isHighlighted={isHighlighted}
        padId="5"
        showLabel={showLabel}
        step={index}
      />
      <SequencerStepPad
        dragEndedEventName={dragEndedEventName}
        dragMovedEventName={dragMovedEventName}
        dragStartedEventName={dragStartedEventName}
        isActive={config["6"]}
        isHighlighted={isHighlighted}
        padId="6"
        showLabel={showLabel}
        step={index}
      />
      <SequencerStepPad
        dragEndedEventName={dragEndedEventName}
        dragMovedEventName={dragMovedEventName}
        dragStartedEventName={dragStartedEventName}
        isActive={config["7"]}
        isHighlighted={isHighlighted}
        padId="7"
        showLabel={showLabel}
        step={index}
      />
      <SequencerStepPad
        dragEndedEventName={dragEndedEventName}
        dragMovedEventName={dragMovedEventName}
        dragStartedEventName={dragStartedEventName}
        isActive={config["8"]}
        isHighlighted={isHighlighted}
        padId="8"
        showLabel={showLabel}
        step={index}
      />
      <SequencerStepPad
        dragEndedEventName={dragEndedEventName}
        dragMovedEventName={dragMovedEventName}
        dragStartedEventName={dragStartedEventName}
        isActive={config["1"]}
        isHighlighted={isHighlighted}
        padId="1"
        showLabel={showLabel}
        step={index}
      />
      <SequencerStepPad
        dragEndedEventName={dragEndedEventName}
        dragMovedEventName={dragMovedEventName}
        dragStartedEventName={dragStartedEventName}
        isActive={config["2"]}
        isHighlighted={isHighlighted}
        padId="2"
        showLabel={showLabel}
        step={index}
      />
      <SequencerStepPad
        dragEndedEventName={dragEndedEventName}
        dragMovedEventName={dragMovedEventName}
        dragStartedEventName={dragStartedEventName}
        isActive={config["3"]}
        isHighlighted={isHighlighted}
        padId="3"
        showLabel={showLabel}
        step={index}
      />
      <SequencerStepPad
        dragEndedEventName={dragEndedEventName}
        dragMovedEventName={dragMovedEventName}
        dragStartedEventName={dragStartedEventName}
        isActive={config["4"]}
        isHighlighted={isHighlighted}
        padId="4"
        showLabel={showLabel}
        step={index}
      />
    </div>
  )
}, isEqual)
