import React from 'react'
import { useShallow } from 'zustand/react/shallow'
import { KitControls } from '~/components/KitControls'
import { Pad } from '~/components/Pad'
import { State } from '~/state'
import uStyles from '~/styles/core/utils.module.css'
import { _ } from '~/utils'
import styles from './PadsScreen.module.css'

export function PadsScreen() {
  const padsIndexed = State.useState(State.select.pads.padsIndexed)
  const padIds = State.useState(State.select.pads.padIds)
  const selectedKitPadsIndexed = State.useState(useShallow(State.select.kits.selectedKitPadsIndexed))
  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={_(uStyles.clearfix, uStyles.pageWidth, styles.group)}>
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
