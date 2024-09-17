export interface KitPad {
  bussId: string
  endTime: number
  id: string
  src: string
  startTime: number
  volume: number
}

export type KitType = 'default' | 'user'

export enum KitTypes {
  Default = 'default',
  User = 'user',
}

export interface Kit {
  id: string
  name: string
  type: KitType
  pads: KitPad[]
}

export interface KitState {
  // state
  kits: Record<string, Kit>
  selectedKitId: string
  editKitMode: boolean
  kitPadEdits: Record<string, Partial<KitPad>>

  // actions
  selectKitById: (kitId: string) => void
  setKits: (kits: Kit[]) => void
  enableEditKitMode: () => void
  disableEditKitMode: () => void
  toggleEditKitMode: () => void
  editKitPad: (padId: string, changes: Partial<KitPad>) => void
  saveKit: (kitName: string) => void
}
