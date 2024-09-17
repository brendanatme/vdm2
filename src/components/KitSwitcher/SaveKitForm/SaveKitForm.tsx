import React from 'react'
import { Button } from '~/components/Button'
import { State } from '~/state'

interface SaveKitFormProps {
  onSuccess?: () => void
}

export function SaveKitForm({ onSuccess }: SaveKitFormProps) {
  const saveKit = State.useState((State.select.kits.saveKit))

  const handleSubmit = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const formData = new FormData(e.target as HTMLFormElement)
    const formProps = Object.fromEntries(formData)
    
    if (formProps.name) {
      saveKit(formProps.name as string)
      onSuccess?.()
    }
  }, [])

  return (
    <form id="SaveKitForm" onSubmit={handleSubmit}>
      <div>
        <label>Kit Name</label>
        <input name="name" required type="text" />
      </div>
      <Button label="Save Kit" type="submit" />
    </form>
  )
}
