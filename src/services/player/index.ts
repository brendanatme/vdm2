import React from 'react'
import { KitPad, SequencerStepConfig } from '~/state'
import mnjs from '~/vendor/mnjs'
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

/**
 * semitoneToRate
 * 
 * Pad.tuning is in semitones, values -6 through 6.
 * Calculate pitch shift from semitones.
 */
const semitoneToRate = (semitones: number) => {
  const semitonesInt = mnjs.round(semitones)
  const semitoneRatio = mnjs.divi(semitonesInt, 12)
  return mnjs.pow(2, semitoneRatio)
}

export function usePlayer({
  bussId,
  endTime,
  padId,
  src,
  startTime,
  tuning,
  volume,
}: {
  bussId: string,
  endTime: number,
  padId: string,
  src: string,
  startTime: number,
  tuning: number,
  volume: number,
}) {
  /**
   * when sound settings or buss change,
   * add src to buss
   * remove prev src from buss
   */
  React.useEffect(() => {
    const rate = semitoneToRate(tuning)
    console.debug({ tuning, rate })
    busses[bussId].add({ endTime, padId, rate, src, startTime, volume })
    return () => busses[bussId].remove(padId)
  }, [bussId, endTime, padId, src, startTime, tuning, volume])

  return {
    play: () => busses[bussId].play(padId),
  }
}

export interface SequencePlayerProps {
  bpm: number
  onStepChange?: (stepIndex: number) => void
  padsIndexed: Record<string, KitPad>
  steps: SequencerStepConfig[]
}

//  ms per minute / bpm / sixteenth notes per beat
const bpmToMs = (bpm: number) => 60000 / bpm / 4

export function useSequencePlayer({ bpm, onStepChange, padsIndexed, steps }: SequencePlayerProps) {
  const playerIntervalId = React.useRef<NodeJS.Timer>()
  const currentStep = React.useRef<number>(0)
  const [isPlaying, setIsPlaying] = React.useState(false)

  /**
   * create a map of bussIds and padIds by step
   */
  const stepBussPadMap = React.useMemo(
    () => steps.map(
      (step) => Object.entries(step).filter(([, value]) => value).map(
        ([padId]) => ({
          bussId: padsIndexed[padId].bussId,
          padId,
        }),
      ),
    ),
    [padsIndexed, steps]
  )

  const play = React.useCallback(() => {
    clearInterval(playerIntervalId.current)
    playerIntervalId.current = setInterval(() => {
      stepBussPadMap[currentStep.current].forEach(
        (bussPad) => busses[bussPad.bussId].play(bussPad.padId)
      )
      currentStep.current = currentStep.current === steps.length - 1
        ? 0
        : currentStep.current + 1
      onStepChange?.(currentStep.current)
    }, bpmToMs(bpm))
    setIsPlaying(true)
  }, [bpm, stepBussPadMap, onStepChange, steps.length])

  const stop = React.useCallback(() => {
    clearInterval(playerIntervalId.current)
    currentStep.current = 0
    setIsPlaying(false)
  }, [])

  /**
   * when component UNmounts,
   * stop playing
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => stop, [])

  /**
   * when padsIndexed are loaded,
   * load all sounds into busses
   */
  React.useEffect(() => {
    Object.values(padsIndexed).forEach(
      ({ id, tuning, ...pad }) => busses[pad.bussId].add({ padId: id, rate: semitoneToRate(tuning), ...pad }),
    )
    return () => Object.values(padsIndexed).forEach(
      (pad) => busses[pad.bussId].remove(pad.id),
    )
  }, [padsIndexed])

  return {
    isPlaying,
    play,
    stop,
  }
}
