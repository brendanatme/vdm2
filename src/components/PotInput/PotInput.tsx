import React from 'react'
import { useDragHandler } from '~/hooks/useDragHandler'
import { clamp } from '~/utils'
import styles from './PotInput.module.css'

interface PotInputProps {
  name?: string
  onChange?: (value: number) => void
  value: number
}

const MOUSE_MOVE_RANGE = 140

const ratioToDeg = (r: number): number => r * 270 - 135

export function PotInput({ name, onChange, value }: PotInputProps) {
  /**
   * Internal values used to convert drag values
   * into display values.
   */
  const calculatedValueRef = React.useRef(value)
  const [displayValue, setDisplayValue] = React.useState(value)
  React.useEffect(() => {
    if (displayValue !== value) setDisplayValue(value)
  }, [value])

  /**
   * Drag handlers and computations
   */
  const mouseStart = React.useRef<number>(0)
  const [mouseMoved, setMouseMoved] = React.useState<number>(0)
  const dragHandler = useDragHandler({
    onDragStart: (e) => { mouseStart.current = e.clientY },
    onDrag: (e) => setMouseMoved(mouseStart.current - e.clientY),
    onDragEnd: () => onChange?.(calculatedValueRef.current),
  })

  React.useEffect(() => {
    calculatedValueRef.current = clamp((mouseMoved / MOUSE_MOVE_RANGE) + value, 0, 1)
    setDisplayValue(calculatedValueRef.current)
  }, [mouseMoved])

  return (
    <div
      {...dragHandler}
      className={styles.pot}
      style={{ transform: `rotate(${ratioToDeg(displayValue)}deg)` }}
    >
      <div className={styles.notch} />
    </div>
  )
}
