import * as React from 'preact'
import { useState } from 'preact/hooks'

import { Chevron } from '@modules/icons'
import {
  GroupContainer,
  GroupContent,
  GroupContentWrapper,
  GroupCounter,
  GroupHeader,
  SideLine
} from './ConsoleLogsGroup.styles'

export const ConsoleLogsGroup = ({ children, logsCount }) => {
  const [isOpen, setIsOpen] = useState(false)

  const isDisabled = logsCount === 0

  return (
    <GroupContainer>
      <GroupHeader onClick={() => setIsOpen(!isOpen)} disabled={isDisabled}>
        <span>
          <GroupCounter data-disabled={isDisabled}>{logsCount}</GroupCounter>

          <span> Page events</span>
        </span>

        <Chevron direction={isOpen ? 'bottom' : 'top'} />
      </GroupHeader>

      <GroupContentWrapper className={isOpen ? '' : 'hidden'}>
        <SideLine />

        <GroupContent>{children}</GroupContent>
      </GroupContentWrapper>
    </GroupContainer>
  )
}
