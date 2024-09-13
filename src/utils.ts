

// @ts-expect-error only use string props
export const indexBy = <T>(prop: keyof T) => (items: T[]): Record<T[keyof T], T> => {
  // @ts-expect-error only use string props
  const output: Record<T[keyof T], T> = {}
  items.forEach((item) => {
    output[item[prop]] = output[item[prop]] || item
  })
  return output
}
