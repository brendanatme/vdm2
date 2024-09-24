import React from 'react'
import { _ } from '~/utils'

interface SquareProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  className?: string
  ratioClass?: string
}

export function Square({ children = null, className = '', ratioClass = 'ratioSquare', ...props }: SquareProps) {
  return (
    <div className={_(ratioClass, className)} {...props}>
      <div className={'flexFill'}>
        {children}
      </div>
    </div>
  )
}
