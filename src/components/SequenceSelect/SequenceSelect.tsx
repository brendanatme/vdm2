import React from 'react'
import { useShallow } from 'zustand/react/shallow'
import { Select } from '~/components/Select'
import { State } from '~/state'
import { _ } from '~/utils'

interface SequenceSelectProps {
  id: string
  type: 'default' | 'user' | 'all'
  label?: string
  onChange?: (kitId: string) => void
  value?: string
}

export function SequenceSelect({ id, type, label, onChange, value }: SequenceSelectProps) {
  const defaultSequences = State.useState(useShallow(State.select.sequencer.defaultSequences))
  const userSequences = State.useState(useShallow(State.select.sequencer.userSequences))

  const showUserSequences = type === 'all' || type === 'user'
  const showDefaultSequences = type === 'all' || type === 'default'

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => onChange?.(e.target.value),
    [onChange],
  )

  return (
    <div className={_('flex')}>
      {label && <p>{label}&nbsp;</p>}
      <Select id={id} onChange={handleChange} value={value}>
        {!!userSequences.length && showUserSequences && (
          <optgroup label="User">
            {userSequences.map((sequence) => (
              <option value={sequence.id} key={sequence.id}>{sequence.name}</option>
            ))}
          </optgroup>
        )}
        {showDefaultSequences && (
          <optgroup label="Default">
            {defaultSequences.map((sequence) => (
              <option value={sequence.id} key={sequence.id}>{sequence.name}</option>
            ))}
          </optgroup>
        )}
      </Select>
    </div>
  )
}
