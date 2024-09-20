import React from 'react'
import { NumberInput } from '~/components/NumberInput'
import { State } from '~/state'

interface BpmInputProps {
  large?: boolean
  short?: boolean
}

export const BpmInput = React.memo(function BpmInput({ large = false, short = false }: BpmInputProps) {
  const bpm = State.useState(State.select.sequencer.bpm)
  const updateBpm = State.useState(State.select.sequencer.updateBpm)
  
  const handleBpmChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>, n?: number) => updateBpm(n), [])

  return (
    <React.Fragment>
      <NumberInput
        large={large}
        name="bpm"
        onChange={handleBpmChange}
        short={short}
        value={bpm}
      />
      <span>&nbsp;</span>
      BPM
    </React.Fragment>
  )
})
