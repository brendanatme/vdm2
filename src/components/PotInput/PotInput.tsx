import React from 'react'
import { getNormalizedEventProp, useDragHandler } from '~/hooks/useDragHandler'
import { clamp, _ } from '~/utils'
import uStyles from '~/styles/core/utils.module.css'
import styles from './PotInput.module.css'

interface PotInputProps {
  onChange?: (value: number) => void
  value: number
}

const MOUSE_MOVE_RANGE = 140

const ratioToDeg = (r: number): number => r * 270 - 135

const getClientY = getNormalizedEventProp<number>('clientY')

export function PotInput({ onChange, value }: PotInputProps) {
  /**
   * Internal values used to convert drag values
   * into display values.
   */
  const calculatedValueRef = React.useRef(value)
  const [displayValue, setDisplayValue] = React.useState(value)
  React.useEffect(() => {
    if (displayValue !== value) setDisplayValue(value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  /**
   * Drag handlers and computations
   */
  const mouseStart = React.useRef<number>(0)
  const [mouseMoved, setMouseMoved] = React.useState<number>(0)
  const dragHandler = useDragHandler({
    onDragStart: (e) => {
      mouseStart.current = getClientY(e)
    },
    onDrag: (e) => {
      setMouseMoved(mouseStart.current - getClientY(e))
    },
    onDragEnd: (e) => {
      onChange?.(calculatedValueRef.current)
    },
  })

  React.useEffect(() => {
    calculatedValueRef.current = clamp((mouseMoved / MOUSE_MOVE_RANGE) + value, 0, 1)
    setDisplayValue(calculatedValueRef.current)
  }, [mouseMoved, value])

  return (
    <div
      {...dragHandler}
      className={_(uStyles.ui, styles.pot)}
      style={{ transform: `rotate(${ratioToDeg(displayValue)}deg)` }}
    >
      <div className={styles.notch} />
    </div>
  )
}
