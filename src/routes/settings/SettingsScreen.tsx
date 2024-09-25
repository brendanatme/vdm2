import React from 'react'
import { FormField } from '~/components/FormField'
import { State } from '~/state'

export function SettingsScreen() {
  const hypeModeEnabled = State.useState(State.select.settings.hypeModeEnabled)
  const toggleHypeModeEnabled = State.useState(State.select.settings.toggleHypeModeEnabled)

  const handleToggleHypeMode = React.useCallback(toggleHypeModeEnabled, [toggleHypeModeEnabled])

  return (
    <div className="textCenter fullWidth">
      <h2 className="textCenter">Settings</h2>
      <div className="pageBody">
        <div className="flex">
          <FormField htmlFor="hypeModeEnabledSetting" label="Enable Hype Mode?">
            <input
              className="ui"
              checked={hypeModeEnabled}
              id="hypeModeEnabledSetting"
              onChange={handleToggleHypeMode}
              type="checkbox"
            />
          </FormField>
        </div>
      </div>
    </div>
  )
}
