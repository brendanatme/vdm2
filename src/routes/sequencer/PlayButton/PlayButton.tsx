import React from 'react'
import { _ } from '~/utils'
import styles from './PlayButton.module.css'
import { KeyboardEvents, useKeyHandler } from '~/hooks/useKeyHandler'

interface PlayButtonProps {
  isPlaying: boolean
  play: () => void
  stop: () => void
}

export function PlayButton({ isPlaying, play, stop }: PlayButtonProps) {
  useKeyHandler({
    callback: isPlaying ? stop : play,
    event: KeyboardEvents.KeyDown,
    key: ' ',
    preventDefault: false,
  })

  return (
    <button
      className={_('ui', 'btnReset', 'flex', styles.container)}
      type="button"
      onPointerDown={isPlaying ? stop : play}
    >
      <div className={isPlaying ? styles.square : styles.triangle} />
    </button>
  )
}
