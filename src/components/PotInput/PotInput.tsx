import React from 'react'
import { getNormalizedEventProp, useDragHandler } from '~/hooks/useDragHandler'
import { clamp, _ } from '~/utils'
import uStyles from '~/styles/core/utils.module.css'
import styles from './PotInput.module.css'

interface PotInputProps {
  min: number
  max: number
  onChange?: (value: number) => void
  sensitivity?: number
  value: number
}


const ratioToDeg = (r: number, min: number, max: number): number => {
  const ratio = (r - min) / (max - min)
  const potRange = 270
  const offset = 135
  return ratio * potRange - offset
}

const getClientY = getNormalizedEventProp<number>('clientY')

export function PotInput({ min, max, onChange, sensitivity = 140, value }: PotInputProps) {
  /**
   * Determines how far user must move pointer to turn pot.
   * 
   * A higher minMax range and/or higher sensitivity = less mouse movement required.
   */
  const mouseMoveRange = React.useMemo(() => (max - min) * sensitivity, [min, max, sensitivity])

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
  const onDrag = React.useCallback((e: MouseEvent | TouchEvent) => {
    const mouseMoved = mouseStart.current - getClientY(e)
    calculatedValueRef.current = clamp((mouseMoved / mouseMoveRange) + value, min, max)
    setDisplayValue(calculatedValueRef.current)
  }, [mouseMoveRange, value, min, max])

  const mouseStart = React.useRef<number>(0)
  const dragHandler = useDragHandler({
    onDragStart: (e) => {
      mouseStart.current = getClientY(e)
    },
    onDrag,
    onDragEnd: (e) => onChange?.(calculatedValueRef.current),
  })

  return (
    <div
      {...dragHandler}
      className={_(uStyles.ui, styles.pot)}
      style={{ transform: `rotate(${ratioToDeg(displayValue, min, max)}deg)` }}
    >
      <div className={styles.notch} />
    </div>
  )
}
