import { StoreState } from '../types'

export const settingsSelectors = {
  // state
  hypeModeEnabled: (state: StoreState) => state.hypeModeEnabledSetting,

  // actions
  toggleHypeModeEnabled: (state: StoreState) => state.toggleHypeModeEnabledSetting,
}
