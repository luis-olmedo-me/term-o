import React, { useEffect, useState } from 'react'
import { actionTypes, parameterTypes } from '../../constants/commands.constants'
import { LogWrapper } from '../LogWrapper/LogWrapper.component'
import { Table } from 'modules/components/Table/Table.component'
import { getActionType } from './CommandStorage.helpers'
import { storageMessages } from './CommandStorage.messages'
import { usePaginationGroups } from 'modules/components/Table/hooks/usePaginationGroups.hook'

const storageHeaders = ['key', 'values']

const turnStorageToTableItems = ({ storage = {} }) => {
  return Object.keys(storage).map((key) => {
    const values = storage[key]
    return [key, values]
  })
}

export const CommandStorage = ({ props, terminal: { command } }) => {
  const actionType = getActionType(props)

  const [tableItems, setTableItems] = useState([])

  const { pageData, buttonGroups } = usePaginationGroups({
    items: tableItems,
    maxItems: 10
  })

  useEffect(
    function handleActionType() {
      switch (actionType) {
        case actionTypes.LOCAL_STORAGE:
          const localStorageAsTableItems = turnStorageToTableItems({
            storage: window.localStorage
          })

          setTableItems(localStorageAsTableItems)
          break

        default:
          break
      }
    },
    [actionType]
  )

  return (
    <>
      <LogWrapper variant={parameterTypes.COMMAND}>{command}</LogWrapper>

      <LogWrapper variant={parameterTypes.TABLE} buttonGroups={buttonGroups}>
        <Table headers={storageHeaders} rows={pageData} />
      </LogWrapper>
    </>
  )
}
