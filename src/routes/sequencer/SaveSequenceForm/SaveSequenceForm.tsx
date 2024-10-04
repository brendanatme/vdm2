import React from 'react'
import { Button } from '~/components/Button'
import { FormField } from '~/components/FormField'
import { TextInput } from '~/components/TextInput'
import { State } from '~/state'

interface SaveSequenceFormProps {
  onSuccess?: () => void
}

export function SaveSequenceForm({ onSuccess }: SaveSequenceFormProps) {
  const saveSequence = State.useState((State.select.sequencer.saveSequence))

  const handleSubmit = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const formData = new FormData(e.target as HTMLFormElement)
    const formProps = Object.fromEntries(formData)
    
    if (formProps.name) {
      saveSequence(formProps.name as string)
      onSuccess?.()
    }
  }, [saveSequence, onSuccess])

  return (
    <form id="SaveSequenceForm" onSubmit={handleSubmit}>
      <FormField label="Sequence Name">
        <TextInput large name="name" required />
      </FormField>
      <br />
      <Button label="Save as Sequence" type="submit" />
    </form>
  )
}
