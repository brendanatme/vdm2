import React from 'react'

export enum KeyboardEvents {
  KeyDown = 'keydown',
  KeyUp = 'keyup',
}

interface KeyHandlerProps {
  event: KeyboardEvents,
  key: string,
  callback: () => void,
}

export function useKeyHandler({ callback, event, key }: KeyHandlerProps) {
  React.useEffect(() => {
    const eventHandler = (e: KeyboardEvent) => {
      e.preventDefault()
      if (e.key === key.toLowerCase()) {
        callback()
      }
    }
    window.addEventListener(event, eventHandler, true)
    return () => window.removeEventListener(event, eventHandler, true)
  }, [callback, event, key])
}
