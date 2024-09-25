/**
 * Modal
 */
import React from 'react'
import ReactDom from 'react-dom'
import { KeyboardEvents, useKeyHandler } from '~/hooks/useKeyHandler'
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

  return ReactDom.createPortal((
    <div
      className={_(
        'vcenterer',
        'fade',
        'fill',
        isOpen ? 'fadeIn' : '',
        isOpen ? styles.fadeIn : '',
        styles.modal,
      )}
    >
      <div
        className={_('fill', styles.bg)}
        onPointerDown={close}
      />

      <div className={_(styles.content, 'vcenteree')}>
        {isOpen && heading && <h2>{heading}</h2>}
        {isOpen && children}
      </div>

      <a
        className={_('ui', 'btnReset', styles.close)}
        onPointerDown={close}
      >
        X (Esc)
      </a>
    </div>
  ), document.body, id)
}
