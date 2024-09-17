/**
 * Modal
 */
import React from 'react'
import ReactDom from 'react-dom'
import { KeyboardEvents, useKeyHandler } from '~/hooks/useKeyHandler'
import utilStyles from '~/styles/core/utils.module.css'
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
  }, [isOpen])

  useKeyHandler({
    callback: close,
    condition: isOpen,
    event: KeyboardEvents.KeyUp,
    key: 'escape',
  })

  return ReactDom.createPortal((
    <div
      className={_(
        utilStyles.vcenterer,
        utilStyles.fade,
        utilStyles.fill,
        isOpen ? utilStyles.fadeIn : '',
        isOpen ? styles.fadeIn : '',
        styles.modal,
      )}
    >
      <div
        className={_(utilStyles.fill, styles.bg)}
        onClick={close}
      />

      <div className={_(styles.content, utilStyles.vcenteree)}>
        {isOpen && heading && <h2>{heading}</h2>}
        {isOpen && children}
      </div>

      <a
        className={_(utilStyles.ui, utilStyles.btnReset, styles.close)}
        onClick={close}
      >
        X (Esc)
      </a>
    </div>
  ), document.body, id)
}
