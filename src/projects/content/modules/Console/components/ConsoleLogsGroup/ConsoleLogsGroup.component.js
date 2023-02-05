import * as React from 'preact'

import { Chevron } from '@modules/icons'
import { GroupContainer, GroupContent, GroupHeader, SideLine } from './ConsoleLogsGroup.styles'

export const ConsoleLogsGroup = ({ children }) => {
  return (
    <GroupContainer>
      <GroupHeader>
        <span>Pinned logs</span>

        <Chevron direction="top" />
      </GroupHeader>

      <SideLine />

      <GroupContent>{children}</GroupContent>
    </GroupContainer>
  )
}
