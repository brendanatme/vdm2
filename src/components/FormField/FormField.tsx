import React from 'react'
import { _ } from '~/utils'
import styles from './FormField.module.css'

interface FormFieldProps {
  children: React.ReactNode
  label: string
  noFlex?: boolean
}

export function FormField({ children, label, noFlex = false }: FormFieldProps) {
  return (
    <div className={styles.container}>
      <div className={_(styles.input, noFlex ? styles.noFlex : '')}>
        {children}
      </div>
      <label>{label}</label>
    </div>
  )
}
