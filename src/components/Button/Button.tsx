import React from 'react'
import { _ } from '~/utils'
import uStyles from '~/styles/core/utils.module.css'
import styles from './Button.module.css'
import { NormalizedEvents } from '~/services/normalizedEvents'

interface ButtonProps {
  isActive?: boolean
  label?: string
  onClick?: (e?: React.MouseEvent) => void
  type?: 'button' | 'submit'
}

export function Button({ isActive, label, onClick, type = 'button' }: ButtonProps) {
  const buttonProps = {
    className: _(
      uStyles.btnReset,
      uStyles.ui,
      styles.btn,
      isActive ? styles.isActive : '',
    ),
    [NormalizedEvents.onMouseDown]: onClick,
    type,
  } as const

  return (
    <button {...buttonProps}>
      {label}
    </button>
  )
}
