import React from 'react'
import { useShallow } from 'zustand/react/shallow'
import { SequenceSelect } from '~/components/SequenceSelect'
import { State } from '~/state'

export function SequenceSwitcher() {
  /**
   * sequence switching
   */
  const selectedSequence = State.useState(useShallow(State.select.sequencer.selectedSequence))
  const selectSequenceById = State.useState(State.select.sequencer.selectSequenceById)

  return (
    <SequenceSelect
      id="SequenceSwitcher_Select"
      type="all"
      label="Sequence:"
      onChange={selectSequenceById}
      value={selectedSequence.id}
    />
  )
}
