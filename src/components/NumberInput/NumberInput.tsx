import React from 'react'
import styles from './NumberInput.module.css'
import { _ } from '~/utils'

interface NumberInputProps {
  large?: boolean
  name: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>, n?: number) => void
  short?: boolean
  value?: number
  required?: boolean
}

export function NumberInput({ large = false, name, onChange, required = false, short = false, value }: NumberInputProps) {
  const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseFloat(e.target.value)
    onChange?.(e, isNaN(num) ? undefined : num)
  }, [])
  return (
    <input
      className={_(
        styles.input,
        large ? styles.lg : '',
        short ? styles.short : '',
      )}
      name={name}
      onChange={handleChange}
      required={required}
      type="text"
      value={value}
    />
  )
}
