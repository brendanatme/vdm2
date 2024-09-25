import type { StateCreator } from 'zustand'
import settingsData from './settings.data.json'
import { SettingsState } from './settings.types'

export const createSettingsSlice: StateCreator<SettingsState> = (set) => ({
  // state
  hypeModeEnabledSetting: settingsData.enableHypeMode,

  // actions
  toggleHypeModeEnabledSetting: () => set((state) => ({ hypeModeEnabledSetting: !state.hypeModeEnabledSetting })),
})
