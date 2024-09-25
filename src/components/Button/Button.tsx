import React from 'react'
import { _ } from '~/utils'
import styles from './Button.module.css'

interface ButtonProps {
  isActive?: boolean
  label?: string
  onClick?: (e?: React.MouseEvent) => void
  type?: 'button' | 'submit'
}

export function Button({ isActive, label, onClick, type = 'button' }: ButtonProps) {
  return (
    <button
      className={_(
        'btnReset',
        'ui',
        styles.btn,
        isActive ? styles.isActive : '',
      )}
      onPointerDown={onClick}
      type={type}
    >
      {label}
    </button>
  )
}
