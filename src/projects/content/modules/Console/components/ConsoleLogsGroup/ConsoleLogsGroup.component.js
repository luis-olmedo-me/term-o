import * as React from 'preact'
import { useState } from 'preact/hooks'

import { Chevron } from '@modules/icons'
import {
  GroupContainer,
  GroupContent,
  GroupContentWrapper,
  GroupHeader,
  SideLine
} from './ConsoleLogsGroup.styles'

export const ConsoleLogsGroup = ({ children, logsCount }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <GroupContainer>
      <GroupHeader onClick={() => setIsOpen(!isOpen)} disabled={logsCount === 0}>
        <span>Page events</span>

        <Chevron direction={isOpen ? 'bottom' : 'top'} />
      </GroupHeader>

      <GroupContentWrapper className={isOpen ? '' : 'hidden'}>
        <SideLine />

        <GroupContent>{children}</GroupContent>
      </GroupContentWrapper>
    </GroupContainer>
  )
}
