import { indexBy, sortBy } from '~/utils'
import { Kit, KitPad, KitState, KitTypes } from './kit.types'
import { StoreState } from '../types'

export function getSelectedKitPadsAndEditsIndexed(state: KitState | StoreState): Record<string, KitPad> {
  const selectedKitPadsIndexed = indexBy<KitPad>('id')(state.kits[state.selectedKitId]?.pads ?? [])
  Object.keys(state.kitPadEdits).forEach((k) => {
    if (selectedKitPadsIndexed[k]) {
      selectedKitPadsIndexed[k] = {
        ...selectedKitPadsIndexed[k],
        ...state.kitPadEdits[k],
      }
    }
  })
  return selectedKitPadsIndexed
}

export const mapAndSortKits = (kitsIndexed: Record<string, Kit>): Kit[] => sortBy<Kit>('id')(Object.values(kitsIndexed))

export const defaultKitTypeFilter = (kit: Kit) => kit.type === KitTypes.Default

export const userKitTypeFilter = (kit: Kit) => kit.type === KitTypes.User
