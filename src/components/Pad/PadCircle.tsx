import React from 'react'
import moJs from 'mo-js'
import uStyles from '~/styles/core/utils.module.css'

/**
 * PadCircle
 * 
 * Circle animation used when drumpad is pressed
 * triggered imperatively,
 * as animations are better imperative over declarative.
 */
export const PadCircle = React.forwardRef(function PadCircle({}, ref) {
  const elRef = React.useRef(null)
  const animRef = React.useRef<typeof moJs.Shape>(null)

  React.useEffect(() => {
    // Prevent multiple instansiations on hot reloads
    if (animRef.current) return

    // Assign a Shape animation to a ref
    animRef.current = new moJs.Shape({
      parent: elRef.current,
      shape: 'circle',
      scale: { 0: 1, easing: 'sin.out' },
      opacity: { 1: 0, easing: 'sin.out' },
      left: '50%',
      top: '50%',
      fill: { 'red': 'purple' },
      radius: '50%',
      duration: 500,
      repeat: 0,
      isShowEnd: false
    })
  })

  React.useImperativeHandle(ref, () => ({
    play() {
      animRef.current?.reset()
      animRef.current?.play()
    },
  }), [])

  return (
    <div
      ref={elRef}
      className={uStyles.fill}
    />
  )
})
