import React from 'react'
import { Buss } from './buss'

const busses: Record<string, Buss> = {
  '1': new Buss(),
  '2': new Buss(),
  '3': new Buss(),
  '4': new Buss(),
  '5': new Buss(),
  '6': new Buss(),
  '7': new Buss(),
  '8': new Buss(),
  '9': new Buss(),
  '10': new Buss(),
  '11': new Buss(),
  '12': new Buss(),
  '13': new Buss(),
  '14': new Buss(),
  '15': new Buss(),
  '16': new Buss(),
}

export function usePlayer({
  bussId,
  endTime,
  padId,
  src,
  startTime,
  volume,
}: {
  bussId: string,
  endTime: number,
  padId: string,
  src: string,
  startTime: number,
  volume: number,
}) {
  /**
   * when sound settings or buss change,
   * add src to buss
   * remove prev src from buss
   */
  React.useEffect(() => {
    busses[bussId].add({ endTime, padId, src, startTime, volume })
    return () => busses[bussId].remove(padId)
  }, [bussId, endTime, padId, src, startTime, volume])

  return {
    play: () => busses[bussId].play(padId),
  }
}
