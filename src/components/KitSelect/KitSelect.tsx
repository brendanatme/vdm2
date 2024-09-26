import React from 'react'
import { useShallow } from 'zustand/react/shallow'
import { Select } from '~/components/Select'
import { State } from '~/state'
import { _ } from '~/utils'

interface KitSelectProps {
  id: string
  type: 'default' | 'user' | 'all'
  label?: string
  onChange?: (kitId: string) => void
  value?: string
}

export function KitSelect({ id, type, label, onChange, value }: KitSelectProps) {
  const defaultKits = State.useState(useShallow(State.select.kits.defaultKits))
  const userKits = State.useState(useShallow(State.select.kits.userKits))

  const showUserKits = type === 'all' || type === 'user'
  const showDefaultKits = type === 'all' || type === 'default'

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => onChange?.(e.target.value),
    [onChange],
  )

  return (
    <div className={_('flex')}>
      {label && <p>{label}&nbsp;</p>}
      <Select id={id} onChange={handleChange} value={value}>
        {!!userKits.length && showUserKits && (
          <optgroup label="User">
            {userKits.map((kit) => (
              <option value={kit.id} key={kit.id}>{kit.name}</option>
            ))}
          </optgroup>
        )}
        {showDefaultKits && (
          <optgroup label="Default">
            {defaultKits.map((kit) => (
              <option value={kit.id} key={kit.id}>{kit.name}</option>
            ))}
          </optgroup>
        )}
      </Select>
    </div>
  )
}
