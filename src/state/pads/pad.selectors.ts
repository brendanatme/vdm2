import { StoreState } from '../types'

export const padSelectors = {
  // state
  padsIndexed: (state: StoreState) => state.padsIndexed,
  padIds: (state: StoreState) => state.padIds,
}
