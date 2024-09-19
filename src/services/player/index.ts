import React from 'react'
import { KitPad, SequencerStepConfig } from '~/state'
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
  }, [bpm, stepBussPadMap])

  const stop = React.useCallback(() => {
    clearInterval(playerIntervalId.current)
    currentStep.current = 0
    setIsPlaying(false)
  }, [])

  const [currentStepIndex, setCurrentStepIndex] = React.useState(currentStep.current)
  React.useEffect(() => {
    setCurrentStepIndex(currentStep.current)
  }, [currentStep.current])

  /**
   * when component UNmounts,
   * stop playing
   */
  React.useEffect(() => stop, [])

  /**
   * when padsIndexed are loaded,
   * load all sounds into busses
   */
  React.useEffect(() => {
    Object.values(padsIndexed).forEach(
      ({ id, ...pad }) => busses[pad.bussId].add({ padId: id, ...pad }),
    )
    return () => Object.values(padsIndexed).forEach(
      (pad) => busses[pad.bussId].remove(pad.id),
    )
  }, [padsIndexed])

  return {
    isPlaying,
    play,
    stop,
    updateStep: currentStepIndex,
  }
}
