import React from 'react'
import { Square } from '~/components/Square'
import { SequencerStepConfig, State } from '~/state'
import { _ } from '~/utils'
import uStyles from '~/styles/core/utils.module.css'
import { NormalizedEvents } from '~/services/normalizedEvents'
import styles from './SequencerStepPad.module.css'

interface SequencerStepPadProps {
  isActive: boolean
  isHighlighted: boolean
  onClick: (stepIndex: number, padId: keyof SequencerStepConfig) => void
  padId: keyof SequencerStepConfig
  showLabel: boolean
  step: number
}

export const SequencerStepPad = React.memo(function SequencerStepPad({
  isActive,
  isHighlighted,
  onClick,
  padId,
  showLabel,
  step,
}: SequencerStepPadProps) {
  const keyName = State.useState(State.select.pads.getKeyNameByPadId(padId))
  const handleToggle = React.useCallback(() => onClick(step, padId), [onClick, padId, step])

  const props = {
    className: _(uStyles.ui, styles.stepPad),
    [NormalizedEvents.onMouseDown]: handleToggle,
  }

  return (
    <div {...props}>
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
