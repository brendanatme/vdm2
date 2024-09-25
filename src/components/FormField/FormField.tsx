import React from 'react'
import { _ } from '~/utils'
import styles from './FormField.module.css'

interface FormFieldProps {
  children: React.ReactNode
  htmlFor?: string
  label: string
  noFlex?: boolean
  small?: boolean
}

export function FormField({ children, htmlFor, label, noFlex = false, small = false }: FormFieldProps) {
  return (
    <div className={_(styles.container, small ? styles.small : '')}>
      <div className={_(styles.input, noFlex ? styles.noFlex : '')}>
        {children}
      </div>
      <label className={htmlFor ? 'ui' : ''} htmlFor={htmlFor}>{label}</label>
    </div>
  )
}
