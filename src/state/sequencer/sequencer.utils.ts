import { iterate } from '~/utils'
import { SequencerStepConfig } from './sequencer.types'

export const generateSteps = (step: SequencerStepConfig, bars: number): SequencerStepConfig[] =>
  iterate(bars * 16).map(() => step)
