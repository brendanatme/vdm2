import React from 'react'
import { Square } from '~/components/Square'
import { Modal, useModalState } from '~/components/Modal'
import { useKeyHandler, KeyboardEvents } from '~/hooks/useKeyHandler'
import { NormalizedEvents } from '~/services/normalizedEvents'
import { usePlayer } from '~/services/player'
import { State } from '~/state'
import { _ } from '~/utils'
import { PadCircle } from './PadCircle'
import styles from './Pad.module.css'
import { PadSettings } from './PadSettings'

interface PadProps {
  bussId: string
  endTime: number
  id: string
  keyName: string
  src: string
  startTime: number
  tuning: number
  volume: number
}

export const Pad = React.memo(function Pad({
  bussId,
  endTime,
  id,
  keyName,
  src,
  startTime,
  tuning,
  volume,
}: PadProps) {
  /**
   * Control the Modal
   * for editing pad settings.
   */
  const editKitMode = State.useState(State.select.kits.editMode)
  const disableEditKitMode = State.useState(State.select.kits.disableEditMode)
  const modal = useModalState()
  const exitEditMode = React.useCallback(() => {
    modal.close()
    disableEditKitMode()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modal.close, disableEditKitMode])
  
  /**
   * When user hits pad,
   * play sound, animation,
   * and update styles via `isPressed`
  */
  const [isPressed, setIsPressed] = React.useState(false)
  const padCircleRef = React.useRef<{ play: () => void }>(null)
  const player = usePlayer({ bussId, endTime, padId: id, src, startTime, tuning, volume })
  const onPlay = React.useCallback(() => {
    player.play()
    padCircleRef.current?.play()
    setIsPressed(true)
    // @todo add enable hype mode switch
    if ((window as any).__HYPE_MODE__) {
      document.getElementById('layout')?.classList.remove('animJolt')
      requestAnimationFrame(() => document.getElementById('layout')?.classList.add('animJolt'))
    }
    setTimeout(() => setIsPressed(false), 100)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player.play])

  /**
   * User can use keyboard to play sound
   */
  const aModalIsOpen = State.useState(State.select.modals.aModalIsOpen)
  useKeyHandler({
    callback: onPlay,
    condition: !aModalIsOpen,
    event: KeyboardEvents.KeyDown,
    key: keyName,
  })

  /**
   * Depending on if we're in editMode or not
   * (set by KitSwitcher),
   * clicking the pad will either play the sound
   * or open the edit modal. If the edit modal is open,
   * clicking should do nothing
   */
  const squareProps = {
    className: _(
      'ui',
      styles.pad,
      isPressed ? styles.isPressed : '',
      editKitMode ? styles.editMode : '',
    ),
    [NormalizedEvents.onMouseDown]: !editKitMode
      ? onPlay
      : undefined,
    [NormalizedEvents.onMouseUp]: editKitMode && !modal.isOpen
      ? modal.open
      : undefined,
  }

  return (
    <div className={styles.container}>
      <Square {...squareProps}>
        <PadCircle ref={padCircleRef} />
        <div className={styles.padKey}>{keyName}</div>
        <Modal
          {...modal}
          close={exitEditMode}
          heading={`EDIT PAD (${keyName})`}
          id={`edit-pad-modal-${id}`}
        >
          <PadSettings
            bussId={bussId}
            endTime={endTime}
            padId={id}
            play={player.play}
            src={src}
            startTime={startTime}
            tuning={tuning}
            volume={volume}
          />
        </Modal>
      </Square>
    </div>
  )
})
