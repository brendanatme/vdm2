

export const indexBy = <T>(prop: keyof T) => (items: T[]): Record<string, T> => {
  const output: Record<string, T> = {}
  items.forEach((item) => {
    output[`${item[prop]}`] = output[`${item[prop]}`] || item
  })
  return output
}

export const sortBy = <T>(prop: keyof T) => (items: T[]): T[] => {
  const output = [...items]
  output.sort((a, b) => `${a[prop]}`.localeCompare(`${b[prop]}`))
  return output
}

export const _ = (...classNames: string[]): string => classNames.join(' ')

export const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max)
