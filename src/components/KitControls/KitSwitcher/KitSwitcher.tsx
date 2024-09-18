import React from 'react'
import { useShallow } from 'zustand/react/shallow'
import { Select } from '~/components/Select'
import { State } from '~/state'
import uStyles from '~/styles/core/utils.module.css'

export function KitSwitcher() {
  /**
   * kit switching
   */
  const defaultKits = State.useState(useShallow(State.select.kits.defaultKits))
  const userKits = State.useState(useShallow(State.select.kits.userKits))
  const selectedKit = State.useState(useShallow(State.select.kits.selectedKit))
  const selectKitById = State.useState(State.select.kits.selectKitById)

  return (
    <div className={uStyles.flex}>
      <p>Kit:&nbsp;</p>
      <Select id="KitSwitcher_Select" onChange={(e) => selectKitById(e.target.value)} value={selectedKit.id}>
        {!!userKits.length && (
          <optgroup label="User">
            {userKits.map((kit) => (
              <option value={kit.id} key={kit.id}>{kit.name}</option>
            ))}
          </optgroup>
        )}
        <optgroup label="Default">
          {defaultKits.map((kit) => (
            <option value={kit.id} key={kit.id}>{kit.name}</option>
          ))}
        </optgroup>
      </Select>
    </div>
  )
}
