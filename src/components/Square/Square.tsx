import React from 'react'
import styles from '~/styles/core/utils.module.css'
import { _ } from '~/utils'

interface SquareProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  className?: string
}

export function Square({ children = null, className = '', ...props }: SquareProps) {
  return (
    <div className={_(styles.ratioSquare, className)} {...props}>
      <div className={styles.flexFill}>
        {children}
      </div>
    </div>
  )
}
