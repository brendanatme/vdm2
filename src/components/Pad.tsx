import React from 'react'
import { usePlayer } from '~/services/player'
import { useKeyHandler, KeyboardEvents } from '~/services/keyHandler'

interface PadProps {
  bussId: string
  endTime: number
  id: string
  keyName: string
  src: string
  startTime: number
  volume: number
}

export function Pad({ bussId, endTime, id, keyName, src, startTime, volume }: PadProps) {

  const [isPlaying, setIsPlaying] = React.useState(false)

  const player = usePlayer({ bussId, endTime, padId: id, src, startTime, volume })

  const onPlay = React.useCallback(() => {
    // setIsPlaying(true)
    player.play()
  }, [player.play])

  useKeyHandler({ event: KeyboardEvents.KeyDown, key: keyName, callback: onPlay })
  // useKeyHandler({ event: KeyboardEvents.KeyUp, key: keyName, callback: () => setIsPlaying(false) })

  return (
    <div onClick={onPlay}>
      <p>keyName: {keyName}</p>
      <p>src: {src}</p>
    </div>
  )
}
