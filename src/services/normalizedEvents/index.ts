// @todo use pointer events
import React from 'react'

function detectTouchscreen() {
  var result = false;
  if (window.PointerEvent && ('maxTouchPoints' in navigator)) {
    // if Pointer Events are supported, just check maxTouchPoints
    if (navigator.maxTouchPoints > 0) {
      result = true;
    }
  } else {
    // no Pointer Events...
    if (window.matchMedia && window.matchMedia("(any-pointer:coarse)").matches) {
      // check for any-pointer:coarse which mostly means touchscreen
      result = true;
    } else if (window.TouchEvent || ('ontouchstart' in window)) {
      // last resort - check for exposed touch events API / event handler
      result = true;
    }
  }
  return result;
}

export const isTouchScreen = detectTouchscreen()

type NormalizedEventTypes = MouseEvent | React.MouseEvent | TouchEvent | React.TouchEvent

export const getNormalizedEventProp = <T>(propKey: keyof MouseEvent | keyof Touch) =>
  (e: NormalizedEventTypes): T =>
    propKey in e ? (e as MouseEvent)[propKey as keyof MouseEvent] as T : (e as TouchEvent).changedTouches[(e as TouchEvent).changedTouches.length - 1][propKey as keyof Touch] as T

export const NormalizedEvents = {
  mousedown: isTouchScreen ? 'touchstart' : 'mousedown',
  mousemove: isTouchScreen ? 'touchmove' : 'mousemove',
  mouseup: isTouchScreen ? 'touchend' : 'mouseup',
  onMouseDown: isTouchScreen ? 'onTouchStart' : 'onMouseDown',
  onMouseMove: isTouchScreen ? 'onTouchMove' : 'onMouseMove',
  onMouseUp: isTouchScreen ? 'onTouchEnd' : 'onMouseUp',
} as const
