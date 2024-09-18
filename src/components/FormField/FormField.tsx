import React from 'react'
import styles from './FormField.module.css'

interface FormFieldProps {
  children: React.ReactNode
  label: string
}

export function FormField({ children, label }: FormFieldProps) {
  return (
    <div className={styles.container}>
      <div className={styles.input}>
        {children}
      </div>
      <label>{label}</label>
    </div>
  )
}
