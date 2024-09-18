import React from 'react'
import { _ } from '~/utils'
import uStyles from '~/styles/core/utils.module.css'
import styles from './Select.module.css'

interface SelectProps {
  children: React.ReactNode
  id: string
  large?: boolean
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  value?: string
}

export function Select({ children, large = false, id, onChange, value }: SelectProps) {
  return (
    <div className={_(uStyles.ui, styles.container, large ? styles.lg : '')}>
      <select className={styles.selectReset} id={id} onChange={onChange} value={value}>
        {children}
      </select>
      <div className={_(styles.triangle, styles.triangleDown)} />
    </div>
  )
}
