import React from 'react'
import { _ } from '~/utils'
import uStyles from '~/styles/core/utils.module.css'
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
  })

  return (
    <button
      className={_(uStyles.ui, uStyles.btnReset, uStyles.flex, styles.container)}
      onClick={isPlaying ? stop : play}
      type="button"
    >
      <div className={isPlaying ? styles.square : styles.triangle} />
    </button>
  )
}
