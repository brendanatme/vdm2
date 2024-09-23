import React from 'react'
import { FormField } from '~/components/FormField'
import { PotInput } from '~/components/PotInput'
import { Select } from '~/components/Select'
import { State } from '~/state'
import uStyles from '~/styles/core/utils.module.css'
import { _ } from '~/utils'

interface PadSettingsProps {
  bussId: string
  padId: string
  tuning: number
  volume: number
}

export function PadSettings({ bussId, padId, tuning, volume }: PadSettingsProps) {
  const editPad = State.useState(State.select.kits.editPad)

  // bussIds are same as padIds
  const bussIds = State.useState(State.select.pads.padIds)

  const onVolumeChange = React.useCallback(
    (value: number) => editPad(padId, { volume: value }),
    [editPad, padId],
  )

  const onBussChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => editPad(padId, { bussId: e.target.value }),
    [editPad, padId],
  )

  const onTuningChange = React.useCallback(
    (value: number) => editPad(padId, { tuning: value }),
    [editPad, padId],
  )

  return (
    <div className={_(uStyles.flex, uStyles.column)}>
      <div className={uStyles.flex}>
        <FormField label="Volume">
          <PotInput min={0} max={1} value={volume} onChange={onVolumeChange} />
        </FormField>
        <FormField label="Buss">
          <Select large id={`Pad${padId}Settings_Select`} onChange={onBussChange} value={bussId}>
            {bussIds.map((bId) => <option key={bId} id={bId}>{bId}</option>)}
          </Select>
        </FormField>
      </div>
      <div className={uStyles.flex}>
        <FormField label="Tuning">
          <PotInput min={-6} max={6} sensitivity={1} value={tuning} onChange={onTuningChange} />
        </FormField>
        {/* <FormField label="???">
          hi
          <Select large id={`Pad${padId}Settings_Select`} onChange={onBussChange} value={bussId}>
            {bussIds.map((bId) => <option key={bId} id={bId}>{bId}</option>)}
          </Select>
        </FormField> */}
      </div>
    </div>
  )
}
