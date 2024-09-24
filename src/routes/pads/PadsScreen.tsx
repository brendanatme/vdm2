import React from 'react'
import { useShallow } from 'zustand/react/shallow'
import { KitControls } from '~/routes/pads/KitControls'
import { Pad } from '~/routes/pads/Pad'
import { State } from '~/state'
import { _ } from '~/utils'
import styles from './PadsScreen.module.css'

export function PadsScreen() {
  const padsIndexed = State.useState(State.select.pads.padsIndexed)
  const padIds = State.useState(State.select.pads.padIds)
  const selectedKitPadsIndexed = State.useState(useShallow(State.select.kits.selectedKitPadsIndexed))
  return (
    <div className={_('flex', 'column', 'rel')}>
      <div className={styles.body}>
        <div className={_('clearfix', 'pageWidth', styles.group)}>
          {padIds.map((padId) => (
            <Pad
              {...selectedKitPadsIndexed[padId]}
              key={padId}
              keyName={padsIndexed[padId].keyName}
            />
          ))}
        </div>
      </div>
      <div className={styles.footer}>
        <KitControls />
      </div>
    </div>
  )
}
