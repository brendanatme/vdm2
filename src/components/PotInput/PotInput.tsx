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
  const MOUSE_MOVE_RANGE = React.useMemo(() => (max - min) * sensitivity, [min, max, sensitivity])

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
      onChange?.(Math.round(calculatedValueRef.current * 100) / 100)
    },
  })

  React.useEffect(() => {
    // console.debug({
    //   mouseMoved,
    //   MOUSE_MOVE_RANGE,
    //   value,
    //   min,
    //   max,
    // })
    // console.debug('calculatedValueRef.current', calculatedValueRef.current)
    calculatedValueRef.current = clamp((mouseMoved / MOUSE_MOVE_RANGE) + value, min, max)
    setDisplayValue(calculatedValueRef.current)
  }, [MOUSE_MOVE_RANGE, mouseMoved, value, min, max])

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
