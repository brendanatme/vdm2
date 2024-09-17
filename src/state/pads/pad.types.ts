
export interface Pad {
  id: string
  keyName: string
}

export interface PadState {
  // state
  padsIndexed: Record<string, Pad>
  padIds: string[]
}
