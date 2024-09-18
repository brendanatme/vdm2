import React from 'react'
import styles from './TextInput.module.css'
import { _ } from '~/utils'

interface TextInputProps {
  large?: boolean
  name: string
  required?: boolean
}

export function TextInput({ large = false, name, required = false }: TextInputProps) {
  return (
    <input
      className={_(styles.input, large ? styles.lg : '')}
      name={name}
      required={required}
      type="text"
    />
  )
}
