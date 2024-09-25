import type { KitState } from './kits/kit.types'
import type { ModalState } from './modals/modal.types'
import type { PadState } from './pads/pad.types'
import type { SettingsState } from './settings/settings.types'
import type { SequencerState } from './sequencer/sequencer.types'

export type StoreState = KitState & ModalState & PadState & SettingsState & SequencerState
