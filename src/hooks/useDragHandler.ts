import React from 'react'
import { getNormalizedEventProp, NormalizedEvents } from '~/services/normalizedEvents'

interface UseDragHandlerProps {
  onDrag?: (e: MouseEvent | TouchEvent) => void
  onDragEnd?: (e: MouseEvent | TouchEvent) => void
  onDragStart?: (e: React.MouseEvent | React.TouchEvent) => void
}

export { getNormalizedEventProp }

export function useDragHandler({ onDrag, onDragEnd, onDragStart }: UseDragHandlerProps) {
  const isDragging = React.useRef(false)

  const startDrag = React.useCallback((e: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = true
    onDragStart?.(e)
  }, [])
  
  React.useEffect(() => {
    const drag = (e: MouseEvent | TouchEvent) => isDragging.current && onDrag?.(e)
    window.addEventListener(NormalizedEvents.mousemove, drag)
    return () => window.removeEventListener(NormalizedEvents.mousemove, drag)
  }, [onDrag, isDragging.current])

  React.useEffect(() => {
    const endDrag = (e: MouseEvent | TouchEvent) => {
      isDragging.current = false
      onDragEnd?.(e)
    }
    window.addEventListener(NormalizedEvents.mouseup, endDrag)
    return () => window.removeEventListener(NormalizedEvents.mouseup, endDrag)
  }, [onDrag, isDragging.current])
  
  return {
    [NormalizedEvents.onMouseDown]: startDrag,
  }
}
