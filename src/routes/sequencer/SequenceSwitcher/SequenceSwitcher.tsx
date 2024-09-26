import React from 'react'
import { useShallow } from 'zustand/react/shallow'
import { KitSelect } from '~/components/KitSelect'
import { State } from '~/state'

export function SequenceSwitcher() {
  /**
   * kit switching
   */
  const selectedKit = State.useState(useShallow(State.select.kits.selectedKit))
  const selectKitById = State.useState(State.select.kits.selectKitById)

  return (
    <KitSelect
      id="SequenceSwitcher_Select"
      kitType="all"
      label="Kit:"
      onChange={selectKitById}
      value={selectedKit.id}
    />
  )
}
