import React from 'react'
import styles from './TextInput.module.css'
import { _ } from '~/utils'

interface TextInputProps {
  large?: boolean
  name: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  value?: string
  required?: boolean
}

export function TextInput({ large = false, name, onChange, required = false, value }: TextInputProps) {
  return (
    <input
      className={_(styles.input, large ? styles.lg : '')}
      name={name}
      onChange={onChange}
      required={required}
      type="text"
      value={value}
    />
  )
}
