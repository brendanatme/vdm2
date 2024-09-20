/**
 * Modal
 */
import React from 'react'
import ReactDom from 'react-dom'
import { KeyboardEvents, useKeyHandler } from '~/hooks/useKeyHandler'
import { NormalizedEvents } from '~/services/normalizedEvents'
import uStyles from '~/styles/core/utils.module.css'
import styles from './Modal.module.css'
import { _ } from '~/utils'
import { State } from '~/state'


interface ModalState {
  isOpen: boolean
  open: (e?: React.MouseEvent) => void
  close: (e?: React.MouseEvent) => void
}

interface ModalProps extends ModalState {
  children?: React.ReactNode
  heading?: string
  id: string
}

export function useModalState(): ModalState  {
  const [isOpen, setIsOpen] = React.useState(false)
  const open = React.useCallback((e?: React.MouseEvent) => {
    e?.preventDefault()
    e?.stopPropagation()
    setIsOpen(true)
  }, [])
  const close = React.useCallback((e?: React.MouseEvent) => {
    e?.preventDefault()
    e?.stopPropagation()
    setIsOpen(false)
  }, [])
  return {
    close,
    isOpen,
    open,
  }
}

export function Modal({ children = null, close, heading, id, isOpen }: ModalProps) {
  const setAModalIsOpen = State.useState(State.select.modals.setAModalIsOpen)

  React.useEffect(() => {
    setAModalIsOpen(isOpen)
  }, [setAModalIsOpen, isOpen])

  useKeyHandler({
    callback: close,
    condition: isOpen,
    event: KeyboardEvents.KeyUp,
    key: 'escape',
  })

  const onCloseProps = {
    [NormalizedEvents.onMouseDown]: close,
  } as const

  return ReactDom.createPortal((
    <div
      className={_(
        uStyles.vcenterer,
        uStyles.fade,
        uStyles.fill,
        isOpen ? uStyles.fadeIn : '',
        isOpen ? styles.fadeIn : '',
        styles.modal,
      )}
    >
      <div
        className={_(uStyles.fill, styles.bg)}
        {...onCloseProps}
      />

      <div className={_(styles.content, uStyles.vcenteree)}>
        {isOpen && heading && <h2>{heading}</h2>}
        {isOpen && children}
      </div>

      <a
        className={_(uStyles.ui, uStyles.btnReset, styles.close)}
        {...onCloseProps}
      >
        X (Esc)
      </a>
    </div>
  ), document.body, id)
}
