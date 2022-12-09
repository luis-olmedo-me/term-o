import * as React from 'preact'

import { Copy } from '@src/modules/icons'

export const defaultCellActionIds = {
  COPY_VALUE: 'copy-value'
}

export const defaultCellActions = [
  {
    id: defaultCellActionIds.COPY_VALUE,
    title: 'Copy',
    onClick: ({ value }) => navigator.clipboard.writeText(value),
    Component: <Copy />
  }
]
