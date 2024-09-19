import { StoreState } from '../types'

export const padSelectors = {
  // state
  padsIndexed: (state: StoreState) => state.padsIndexed,
  padIds: (state: StoreState) => state.padIds,
  getKeyNameByPadId: (padId: string) => (state: StoreState) => state.padsIndexed[padId].keyName,
}
