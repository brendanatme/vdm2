import React from 'react'
import { PotInput } from '~/components/PotInput'
import { State } from '~/state'
import utilStyles from '~/styles/core/utils.module.css'

interface PadSettingsProps {
  padId: string
  volume: number
}

export function PadSettings({ padId, volume }: PadSettingsProps) {
  const editPad = State.useState(State.select.kits.editPad)

  const onVolumeChange = React.useCallback(
    (value: number) => editPad(padId, { volume: value }),
    [padId],
  )

  return (
    <div>
      <div className={utilStyles.flex}>
        <div>
          <PotInput value={volume} onChange={onVolumeChange} />
          <label>Volume</label>
        </div>
        <div>
          {/* <PotInput value={volume} onChange={onVolumeChange} /> */}
          <label>Buss</label>
        </div>
      </div>
    </div>
  )
}
