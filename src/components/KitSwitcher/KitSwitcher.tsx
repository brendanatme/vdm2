import React from 'react'
import { useShallow } from 'zustand/react/shallow'
import { Button } from '~/components/Button'
import { State } from '~/state'
import { _ } from '~/utils'
import utilStyles from '~/styles/core/utils.module.css'
import { Modal, useModalState } from '../Modal'
import styles from './KitSwitcher.module.css'
import { SaveKitForm } from './SaveKitForm'

export function KitSwitcher() {
  
  /**
   * get kit list and current selected kit
   */
  const defaultKits = State.useState(useShallow(State.select.kits.defaultKits))
  const userKits = State.useState(useShallow(State.select.kits.userKits))
  const selectedKit = State.useState(useShallow(State.select.kits.selectedKit))
  const selectKitById = State.useState(State.select.kits.selectKitById)
  
  /**
   * edit mode controls
   */
  const editMode = State.useState(State.select.kits.editMode)
  const hasEdits = State.useState(useShallow(State.select.kits.hasEdits))
  const toggleEditMode = State.useState(State.select.kits.toggleEditMode)
  
  const saveModal = useModalState()

  return (
    <div className={styles.container}>
      <div className={styles.pageWidth}>
        {editMode && <p className={styles.editMsg}>Select a pad to edit.</p>}
        <div className={_(utilStyles.flex, utilStyles.between)}>
          <div className={utilStyles.flex}>
            <p>Kit:&nbsp;</p>
            <select onChange={(e) => selectKitById(e.target.value)} value={selectedKit.id}>
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
            </select>
          </div>
          <Button
            isActive={editMode}
            label="Edit Kit"
            onClick={toggleEditMode}
          />
        </div>
        {hasEdits && (
          <div className={_(utilStyles.flex, utilStyles.between)}>
            <span>(edited)</span>
            <a onClick={saveModal.open}>Save changes as</a>
          </div>
        )}
      </div>
      <Modal
        {...saveModal}
        heading="Save kit as"
        id="KitSwitcher_SaveKitModal"
      >
        <SaveKitForm onSuccess={saveModal.close} />
      </Modal>
    </div>
  )
}
