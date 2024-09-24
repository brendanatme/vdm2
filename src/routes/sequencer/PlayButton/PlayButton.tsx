import React from 'react'
import { NormalizedEvents } from '~/services/normalizedEvents'
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

  const buttonProps = {
    className: _('ui', 'btnReset', 'flex', styles.container),
    type: 'button',
    [NormalizedEvents.onMouseDown]: isPlaying ? stop : play,
  } as const

  return (
    <button {...buttonProps}>
      <div className={isPlaying ? styles.square : styles.triangle} />
    </button>
  )
}
