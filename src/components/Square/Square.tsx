import React from 'react'
import uStyles from '~/styles/core/utils.module.css'
import { _ } from '~/utils'

interface SquareProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  className?: string
  ratioClass?: string
}

export function Square({ children = null, className = '', ratioClass = 'ratioSquare', ...props }: SquareProps) {
  return (
    <div className={_(uStyles[ratioClass], className)} {...props}>
      <div className={uStyles.flexFill}>
        {children}
      </div>
    </div>
  )
}
