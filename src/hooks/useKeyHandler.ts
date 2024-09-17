import React from 'react'

export enum KeyboardEvents {
  KeyDown = 'keydown',
  KeyUp = 'keyup',
}

interface KeyHandlerProps {
  event: KeyboardEvents,
  key: string,
  callback: () => void,
  condition?: boolean
}

export function useKeyHandler({ callback, condition = true, event, key }: KeyHandlerProps) {
  React.useEffect(() => {
    const eventHandler = (e: KeyboardEvent) => {
      e.preventDefault()
      if (e.key.toLowerCase() === key.toLowerCase()) {
        callback()
      }
    }
    if (condition) {
      window.addEventListener(event, eventHandler, true)
    }
    return () => {
      if (condition) {
        window.removeEventListener(event, eventHandler, true) 
      }
    }
  }, [callback, condition, event, key])
}
