import type { KitState } from './kits/kit.types'
import type { ModalState } from './modals/modal.types'
import type { PadState } from './pads/pad.types'
import type { SequencerState } from './sequencer/sequencer.types'

export interface StoreState extends KitState, ModalState, PadState, SequencerState {}
