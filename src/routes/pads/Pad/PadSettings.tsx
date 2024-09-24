import React from 'react'
import { FormField } from '~/components/FormField'
import { KitSelect } from '~/components/KitSelect'
import { PotInput } from '~/components/PotInput'
import { Select } from '~/components/Select'
import { SoundSelect } from '~/components/SoundSelect'
import { State } from '~/state'
import { _ } from '~/utils'

interface PadSettingsProps {
  bussId: string
  endTime: number
  padId: string
  src: string
  startTime: number
  tuning: number
  volume: number
}

export function PadSettings({ bussId, endTime, padId, src, startTime, tuning, volume }: PadSettingsProps) {
  const editPad = State.useState(State.select.kits.editPad)
  const selectedKit = State.useState(State.select.kits.selectedKit)

  // bussIds are different entities, but the same as padIds
  const bussIds = State.useState(State.select.pads.padIds)

  const [_selectedKitId, _selectKitId] = React.useState<string>(selectedKit.id)
  const onKitChange = React.useCallback((kitId: string) => _selectKitId(kitId), [])

  const onSoundChange = React.useCallback((value: string) => {
    editPad(padId, { src: value })
  }, [editPad, padId])

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

  const onStartTimeChange = React.useCallback(
    (value: number) => editPad(padId, { startTime: value }),
    [editPad, padId],
  )

  const onEndTimeChange = React.useCallback(
    (value: number) => editPad(padId, { endTime: value }),
    [editPad, padId],
  )

  return (
    <div className={_('flex', 'column')}>
      <div>
        <FormField label="Sound" noFlex small>
          <KitSelect
            id={`PadSettings_${padId}_KitSelect`}
            kitType="all"
            onChange={onKitChange}
            value={_selectedKitId}
          />
          <SoundSelect
            id={`PadSettings_${padId}_SoundSelect`}
            kitId={_selectedKitId}
            onChange={onSoundChange}
            value={src}
          />
        </FormField>
      </div>
      <div className="flex">
        <FormField label="Volume">
          <PotInput min={0} max={1} value={volume} onChange={onVolumeChange} />
        </FormField>
        <FormField label="Buss">
          <Select large id={`Pad${padId}Settings_Select`} onChange={onBussChange} value={bussId}>
            {bussIds.map((bId) => <option key={bId} id={bId}>{bId}</option>)}
          </Select>
        </FormField>
        <FormField label="Tuning">
          <PotInput min={-6} max={6} sensitivity={1} value={tuning} onChange={onTuningChange} />
        </FormField>
      </div>
      <div className="flex">
        <FormField label="Trim Start">
          <PotInput
            max={5000}
            min={0}
            onChange={onStartTimeChange}
            sensitivity={0.000002}
            value={startTime}
          />
        </FormField>
        <FormField label="Trim End">
          <PotInput
            max={5000}
            min={0}
            onChange={onEndTimeChange}
            sensitivity={0.000002}
            value={endTime}
          />
        </FormField>
      </div>
    </div>
  )
}
