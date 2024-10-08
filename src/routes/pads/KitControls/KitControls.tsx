import React from 'react'
import { useShallow } from 'zustand/react/shallow'
import { Button } from '~/components/Button'
import { KitSwitcher } from '~/components/KitSwitcher'
import { State } from '~/state'
import { _ } from '~/utils'
import styles from './KitControls.module.css'
import { SaveKitButton } from './SaveKitButton'

export function KitControls() {
  /**
   * edit mode controls
   */
  const editMode = State.useState(State.select.kits.editMode)
  const hasEdits = State.useState(useShallow(State.select.kits.hasEdits))
  const toggleEditMode = State.useState(State.select.kits.toggleEditMode)
  
  return (
    <div className={'pageWidth'}>
      {editMode && <p className={styles.editMsg}>Select a pad to edit.</p>}
      <div className={_('flex', 'between')}>
        <KitSwitcher />
        <Button
          isActive={editMode}
          label="Edit Kit"
          onClick={toggleEditMode}
        />
      </div>
      {hasEdits ? (
        <div className={_('flex', 'between')}>
          <span>(edited)</span>
          <SaveKitButton />
        </div>
      ) : (
        <div>
          <span>&nbsp;</span>
        </div>
      )}
    </div>
  )
}
