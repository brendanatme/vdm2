import React from 'react'
import { Select } from '~/components/Select'
import { State } from '~/state'
import { _ } from '~/utils'

interface SoundSelectProps {
  id: string
  kitId?: string
  onChange?: (soundSrc: string) => void
  value?: string
}

const getFilenameFromSrc = (src: string) => src.substring(src.lastIndexOf('/') + 1)

export function SoundSelect({ id, kitId, onChange, value }: SoundSelectProps) {
  const sounds = State.useState(State.select.kits.kitSounds(kitId))

  return (
    <div className={_('flex')}>
      <Select id={id} onChange={(e) => onChange?.(e.target.value)} value={value}>
        {sounds.map((sound, i) => (
          <option value={sound} key={`${sound}${i}`}>{getFilenameFromSrc(sound)}</option>
        ))}
      </Select>
    </div>
  )
}
