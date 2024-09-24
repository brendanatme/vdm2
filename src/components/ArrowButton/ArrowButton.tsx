import React from 'react'
import { NormalizedEvents } from '~/services/normalizedEvents'
import { _ } from '~/utils'
import styles from './ArrowButton.module.css'

interface ArrowButtonProps {
  isActive?: boolean
  isDisabled?: boolean
  next?: boolean
  onClick?: (e?: React.MouseEvent) => void
  prev?: boolean
  type?: 'button' | 'submit'
}

export function ArrowButton({
  isActive = false,
  isDisabled = false,
  next = false,
  onClick,
  prev = false,
}: ArrowButtonProps) {
  const buttonProps = {
    className: _(
      'btnReset',
      'ui',
      styles.arrowBtn,
      isActive ? styles.isActive : '',
      isDisabled ? styles.isDisabled : '',
    ),
    [NormalizedEvents.onMouseDown]: onClick,
    type: 'button',
  } as const

  return (
    <button {...buttonProps}>
      <span
        className={_(
          styles.arrow,
          next ? styles.next : '',
          prev ? styles.prev : '',
        )}
      />
    </button>
  )
}
