import React, { useEffect, useState, useCallback } from 'react'
import { parameterTypes } from '../../constants/commands.constants'
import { LogWrapper } from '../LogWrapper/LogWrapper.component'
import { Table } from 'modules/components/Table/Table.component'
import {
  getActionType,
  parseValue,
  turnStorageToTableItems
} from './CommandStorage.helpers'
import { storageMessages } from './CommandStorage.messages'
import { usePaginationGroups } from 'modules/components/Table/hooks/usePaginationGroups.hook'
import { storageActionTypes, storageHeaders } from './CommandStorage.constants'

export const CommandStorage = ({
  props,
  terminal: { command, setMessageData }
}) => {
  const actionType = getActionType(props)

  const [tableItems, setTableItems] = useState([])

  const { pageData, buttonGroups } = usePaginationGroups({
    items: tableItems,
    maxItems: 10
  })

  const handleShowLocalStorage = useCallback(() => {
    const localStorageAsTableItems = turnStorageToTableItems({
      storage: window.localStorage
    })

    const isEmptyStorage = localStorageAsTableItems.length === 0

    if (isEmptyStorage) return setMessageData(storageMessages.emptyStorage)

    setTableItems(localStorageAsTableItems)
  }, [setMessageData])

  useEffect(
    function handleActionType() {
      switch (actionType) {
        case storageActionTypes.SHOW_LOCAL_STORAGE:
          handleShowLocalStorage()
          break

        default:
          break
      }
    },
    [actionType, handleShowLocalStorage]
  )

  return (
    <>
      <LogWrapper variant={parameterTypes.COMMAND}>{command}</LogWrapper>

      <LogWrapper variant={parameterTypes.TABLE} buttonGroups={buttonGroups}>
        <Table
          headers={storageHeaders}
          rows={pageData}
          parseValue={parseValue}
        />
      </LogWrapper>
    </>
  )
}
