import React from 'react'
import { Pad } from '~/components/Pad'
import padData from '~/data/pads.json'
import { indexBy } from '~/utils'

interface PadData {
  bussId: string,
  endTime: number,
  id: string,
  keyName: string,
  src: string,
  startTime: number,
  volume: number,
}

const padSettings = indexBy<PadData>('id')(padData)
const padSettingsKeys = Object.keys(padSettings)

export function Pads() {
  return (
    <div>
      <h1>Pads</h1>
      {padSettingsKeys.map((i) => <Pad {...padSettings[i]} key={i} />)}
    </div>
  )
}
