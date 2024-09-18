import React from 'react'
import { Modal, useModalState } from '~/components/Modal'
import { SaveKitForm } from '../SaveKitForm'

export function SaveKitButton() {
  const modal = useModalState()

  return (
    <div>
      <a onClick={modal.open}>Save changes as</a>
      <Modal
        {...modal}
        heading="Save kit as"
        id="SaveKitButton_Modal"
      >
        <SaveKitForm onSuccess={modal.close} />
      </Modal>
    </div>
  )
}
