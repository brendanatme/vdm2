import React from 'react'
import { Modal, useModalState } from '~/components/Modal'
import { NormalizedEvents } from '~/services/normalizedEvents'
import { SaveKitForm } from '../SaveKitForm'

export function SaveKitButton() {
  const modal = useModalState()

  const anchorProps = {
    [NormalizedEvents.onMouseDown]: modal.open,
  }

  return (
    <div>
      <a {...anchorProps}>Save changes as</a>
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
