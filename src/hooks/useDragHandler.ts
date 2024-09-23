// @todo use pointer events
import React from 'react'
import { getNormalizedEventProp, NormalizedEvents } from '~/services/normalizedEvents'

interface UseDragHandlerProps {
  onDrag?: (e: MouseEvent | TouchEvent) => void
  onDragEnd?: (e: MouseEvent | TouchEvent) => void
  onDragStart?: (e: React.MouseEvent | React.TouchEvent) => void
}

export { getNormalizedEventProp }

export function useDragHandler({ onDrag, onDragEnd, onDragStart }: UseDragHandlerProps) {
  const [isDragging, setIsDragging] = React.useState(false)

  /**
   * callback refs will be used to bind/unbind event handlers to window
   */
  const isBound = React.useRef(false)
  const dragRef = React.useRef<(e: MouseEvent | TouchEvent) => void>()
  const endDragRef = React.useRef<(e: MouseEvent | TouchEvent) => void>()

  const drag = React.useCallback(
    (e: MouseEvent | TouchEvent) => onDrag?.(e),
    [onDrag],
  )
  
  React.useEffect(() => {
    dragRef.current = drag
  }, [drag])

  const endDrag = React.useCallback((e: MouseEvent | TouchEvent) => {
    setIsDragging(false)
    onDragEnd?.(e)
  }, [onDragEnd])
  
  React.useEffect(() => {
    endDragRef.current = endDrag
  }, [endDrag])

  const startDrag = React.useCallback((e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true)
    onDragStart?.(e)
  }, [onDragStart])

  /**
   * When isDragging begins,
   * bind window events.
   * When isDragging ends, unbind window events.
   */
  React.useEffect(() => {
    const dragHandler = (e: MouseEvent | TouchEvent) => dragRef.current?.(e)
    const endDragHandler = (e: MouseEvent | TouchEvent) => endDragRef.current?.(e)

    if (!isBound.current && isDragging) {
      window.addEventListener(NormalizedEvents.mousemove, dragHandler)
      window.addEventListener(NormalizedEvents.mouseup, endDragHandler)
      isBound.current = true
    }

    return () => {
      if (isDragging && isBound.current) {
        window.removeEventListener(NormalizedEvents.mousemove, dragHandler)
        window.removeEventListener(NormalizedEvents.mouseup, endDragHandler)
        isBound.current = false
      }
    }
  }, [isDragging])
  
  return {
    [NormalizedEvents.onMouseDown]: startDrag,
  }
}
