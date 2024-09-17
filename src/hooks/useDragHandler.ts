import React from 'react'

interface UseDragHandlerProps {
  onDrag?: (e: MouseEvent) => void
  onDragEnd?: (e: MouseEvent) => void
  onDragStart?: React.MouseEventHandler
}

export function useDragHandler({ onDrag, onDragEnd, onDragStart }: UseDragHandlerProps) {
  const isDragging = React.useRef(false)

  const startDrag = React.useCallback((e: React.MouseEvent) => {
    isDragging.current = true
    onDragStart?.(e)
  }, [])
  
  React.useEffect(() => {
    const drag = (e: MouseEvent) => isDragging.current && onDrag?.(e)
    window.addEventListener('mousemove', drag)
    return () => window.removeEventListener('mousemove', drag)
  }, [onDrag, isDragging.current])

  React.useEffect(() => {
    const endDrag = (e: MouseEvent) => {
      isDragging.current = false
      onDragEnd?.(e)
    }
    window.addEventListener('mouseup', endDrag)
    return () => window.removeEventListener('mouseup', endDrag)
  }, [onDrag, isDragging.current])
  
  return {
    onMouseDown: startDrag,
  }
}
