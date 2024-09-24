import React from 'react'
import { _ } from '~/utils'
import styles from './Square.module.css'

interface SquareProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  className?: string
  flexFill?: boolean
  ratio?: 'square' | 'threeQuarters' | 'oneFifty'
}

export function Square({ children = null, className = '', flexFill = false, ratio = 'square', ...props }: SquareProps) {
  return (
    <div className={_(styles.ratio, styles[ratio], className)} {...props}>
      <div className={flexFill ? 'flexFill' : 'fill'}>
        {children}
      </div>
    </div>
  )
}
