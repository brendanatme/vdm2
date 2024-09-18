import { StoreState } from '../types'
import {
  defaultKitTypeFilter,
  getSelectedKitPadsAndEditsIndexed,
  mapAndSortKits,
  userKitTypeFilter,
} from './kit.utils'

export const kitSelectors = {
  // state
  kits: (state: StoreState) => mapAndSortKits(state.kits),
  selectedKit: (state: StoreState) => state.kits[state.selectedKitId],
  selectedKitPadsIndexed: getSelectedKitPadsAndEditsIndexed,
  editMode: (state: StoreState) => state.editKitMode,
  hasEdits: (state: StoreState) => !!Object.keys(state.kitPadEdits).length,
  userKits: (state: StoreState) => mapAndSortKits(state.kits).filter(userKitTypeFilter),
  defaultKits: (state: StoreState) => mapAndSortKits(state.kits).filter(defaultKitTypeFilter),
  
  // actions
  selectKitById: (state: StoreState) => state.selectKitById,
  enableEditMode: (state: StoreState) => state.enableEditKitMode,
  disableEditMode: (state: StoreState) => state.disableEditKitMode,
  toggleEditMode: (state: StoreState) => state.toggleEditKitMode,
  editPad: (state: StoreState) => state.editKitPad,
  saveKit: (state: StoreState) => state.saveKit,
}
