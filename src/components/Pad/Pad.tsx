import React from 'react'
import { Square } from '~/components/Square'
import { Modal, useModalState } from '~/components/Modal'
import { useKeyHandler, KeyboardEvents } from '~/hooks/useKeyHandler'
import { NormalizedEvents } from '~/services/normalizedEvents'
import { usePlayer } from '~/services/player'
import { State } from '~/state'
import { _ } from '~/utils'
import uStyles from '~/styles/core/utils.module.css'
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
  volume: number
}

export const Pad = React.memo(function Pad({ bussId, endTime, id, keyName, src, startTime, volume }: PadProps) {
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
  }, [modal.close, disableEditKitMode])
  
  /**
   * When user hits pad,
   * play sound, animation,
   * and update styles via `isPressed`
  */
  const [isPressed, setIsPressed] = React.useState(false)
  const padCircleRef = React.useRef<{ play: () => void }>(null)
  const player = usePlayer({ bussId, endTime, padId: id, src, startTime, volume })
  const onPlay = React.useCallback((e?: MouseEvent | TouchEvent) => {
    e?.preventDefault()
    player.play()
    padCircleRef.current?.play()
    setIsPressed(true)
    setTimeout(() => setIsPressed(false), 100)
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
      uStyles.ui,
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
          <PadSettings bussId={bussId} padId={id} volume={volume} />
        </Modal>
      </Square>
    </div>
  )
})
