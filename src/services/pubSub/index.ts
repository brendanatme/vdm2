export function subscribe<T>(eventName: string, listener: (e: T) => void) {
  (document as any).addEventListener(eventName, listener)
}

export function unsubscribe<T>(eventName: string, listener: (e: T) => void) {
  (document as any).removeEventListener(eventName, listener)
}

export function publish<T>(eventName: string, data: T) {
  const event = new CustomEvent<T>(eventName, { detail: data });
  (document as any).dispatchEvent(event)
}
