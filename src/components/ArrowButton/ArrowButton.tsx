import React from 'react'
import { _ } from '~/utils'
import styles from './ArrowButton.module.css'

interface ArrowButtonProps {
  isActive?: boolean
  isDisabled?: boolean
  next?: boolean
  onClick?: (e?: React.MouseEvent) => void
  point?: 'left' | 'right' | 'up' | 'down'
  prev?: boolean
  type?: 'button' | 'submit'
}

export function ArrowButton({
  isActive = false,
  isDisabled = false,
  next = false,
  onClick,
  point = 'right',
  prev = false,
}: ArrowButtonProps) {
  return (
    <button
      className={_(
        'btnReset',
        'ui',
        styles.arrowBtn,
        isActive ? styles.isActive : '',
        isDisabled ? styles.isDisabled : '',
      )}
      onPointerDown={onClick}
      type="button"
    >
      <span className={_(styles.arrow, styles[point])} />
    </button>
  )
}
