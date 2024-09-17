import React from 'react'
import { useShallow } from 'zustand/react/shallow'
import { KitSwitcher } from '~/components/KitSwitcher'
import { Pad } from '~/components/Pad'
import { State } from '~/state'
import utilStyles from '~/styles/core/utils.module.css'
import { _ } from '~/utils'
import styles from './PadsScreen.module.css'

export function PadsScreen() {
  const padsIndexed = State.useState(State.select.pads.padsIndexed)
  const padIds = State.useState(State.select.pads.padIds)
  const selectedKitPadsIndexed = State.useState(useShallow(State.select.kits.selectedKitPadsIndexed))
  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={_(utilStyles.clearfix, utilStyles.center, styles.group)}>
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
        <KitSwitcher />
      </div>
    </div>
  )
}
