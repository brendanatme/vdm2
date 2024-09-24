export { default as isEqual } from 'lodash.isequal'

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

export const splice = <T>(arr: T[], index: number, insert: T, replaceLength = 1): T[] => {
  const copy = [...arr]
  copy.splice(index, replaceLength, insert)
  return [...copy]
}

export const iterate = (times: number): number[] => {
  let arr = []
  let n = times
  while (n > 0) {
    arr.push(--n)
  }
  return arr.reverse()
}
