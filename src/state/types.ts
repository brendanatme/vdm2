import type { KitState } from './kits/kit.types'
import type { ModalState } from './modals/modal.types'
import type { PadState } from './pads/pad.types'

export interface StoreState extends KitState, ModalState, PadState {}
