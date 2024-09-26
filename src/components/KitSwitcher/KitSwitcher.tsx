import React from 'react'
import { useShallow } from 'zustand/react/shallow'
import { KitSelect } from '~/components/KitSelect'
import { State } from '~/state'

export function KitSwitcher() {
  /**
   * kit switching
   */
  const selectedKit = State.useState(useShallow(State.select.kits.selectedKit))
  const selectKitById = State.useState(State.select.kits.selectKitById)

  return (
    <KitSelect
      id="KitSwitcher_Select"
      type="all"
      label="Kit:"
      onChange={selectKitById}
      value={selectedKit.id}
    />
  )
}
