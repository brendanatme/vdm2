import memoize from 'lodash.memoize'
import React from 'react'

/**
 * useCallbackCreator
 *
 * Memoizes a higher order function that can be passed a parameter and return a callback.
 *
 * Useful for passing callbacks to lists of child components.
 *
 * These callbacks will be memoized, preventing unnecessary re-renders.
 *
 * Example usage:
 *
 * ```tsx
 * const MyComponent = ({ items }) => {
 *  const createClickHandler = useCallbackCreator((id: string) => () => {
 *    console.log(id)
 *  }, [])
 *  return (
 *    <div>
 *      {items.map((item) => (
 *        <button onClick={createClickHandler(item.id)}>{item.name}</button>
 *      ))}
 *    </div>
 *  )
 * }
 * ```
 */
export function useCallbackCreator<T extends (...args: any) => any>(
  callbackCreator: T,
  dependencies: unknown[] = [],
): T {
  return React.useMemo(() => memoize(callbackCreator), dependencies)
}
