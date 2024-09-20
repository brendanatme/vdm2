import React from 'react'
import { subscribe, unsubscribe } from '~/services/pubSub'
import { SequencerStepConfig } from '~/state'
import { _, isEqual } from '~/utils'
import { SequencerStepPad } from '../SequencerStepPad'
import styles from './SequencerStep.module.css'

interface SequencerStepProps {
  config: SequencerStepConfig
  eventName: string
  index: number
  onClick: (stepIndex: number, padId: keyof SequencerStepConfig) => void
  showLabel?: boolean
}

export const SequencerStep = React.memo(function SequencerStep({
  config,
  eventName,
  index,
  onClick,
  showLabel = false,
}: SequencerStepProps) {
  const [isHighlighted, setIsHighlighted] = React.useState(index === 0)

  const cb = (e: CustomEvent<number>) => setIsHighlighted(e.detail === index)
  
  React.useEffect(() => {
    subscribe<CustomEvent<number>>(eventName, cb)
    return () => unsubscribe<CustomEvent<number>>(eventName, cb)
  }, [eventName])

  return (
    <div className={_(styles.container, isHighlighted ? styles.highlight : '')}>
      <SequencerStepPad isActive={config["13"]} isHighlighted={isHighlighted} onClick={onClick} padId="13" showLabel={showLabel} step={index} />
      <SequencerStepPad isActive={config["14"]} isHighlighted={isHighlighted} onClick={onClick} padId="14" showLabel={showLabel} step={index} />
      <SequencerStepPad isActive={config["15"]} isHighlighted={isHighlighted} onClick={onClick} padId="15" showLabel={showLabel} step={index} />
      <SequencerStepPad isActive={config["16"]} isHighlighted={isHighlighted} onClick={onClick} padId="16" showLabel={showLabel} step={index} />
      <SequencerStepPad isActive={config["9"]}  isHighlighted={isHighlighted} onClick={onClick} padId="9"  showLabel={showLabel} step={index} />
      <SequencerStepPad isActive={config["10"]} isHighlighted={isHighlighted} onClick={onClick} padId="10" showLabel={showLabel} step={index} />
      <SequencerStepPad isActive={config["11"]} isHighlighted={isHighlighted} onClick={onClick} padId="11" showLabel={showLabel} step={index} />
      <SequencerStepPad isActive={config["12"]} isHighlighted={isHighlighted} onClick={onClick} padId="12" showLabel={showLabel} step={index} />
      <SequencerStepPad isActive={config["5"]} isHighlighted={isHighlighted} onClick={onClick} padId="5" showLabel={showLabel} step={index} />
      <SequencerStepPad isActive={config["6"]} isHighlighted={isHighlighted} onClick={onClick} padId="6" showLabel={showLabel} step={index} />
      <SequencerStepPad isActive={config["7"]} isHighlighted={isHighlighted} onClick={onClick} padId="7" showLabel={showLabel} step={index} />
      <SequencerStepPad isActive={config["8"]} isHighlighted={isHighlighted} onClick={onClick} padId="8" showLabel={showLabel} step={index} />
      <SequencerStepPad isActive={config["1"]} isHighlighted={isHighlighted} onClick={onClick} padId="1" showLabel={showLabel} step={index} />
      <SequencerStepPad isActive={config["2"]} isHighlighted={isHighlighted} onClick={onClick} padId="2" showLabel={showLabel} step={index} />
      <SequencerStepPad isActive={config["3"]} isHighlighted={isHighlighted} onClick={onClick} padId="3" showLabel={showLabel} step={index} />
      <SequencerStepPad isActive={config["4"]} isHighlighted={isHighlighted} onClick={onClick} padId="4" showLabel={showLabel} step={index} />
    </div>
  )
}, isEqual)
