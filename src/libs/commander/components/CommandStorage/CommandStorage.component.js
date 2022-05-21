import React, { useEffect, useState } from 'react'
import { actionTypes, parameterTypes } from '../../constants/commands.constants'
import { LogWrapper } from '../LogWrapper/LogWrapper.component'
import { Table } from 'modules/components/Table/Table.component'
import { getActionType } from './CommandStorage.helpers'
import { storageMessages } from './CommandStorage.messages'
import { usePaginationGroups } from 'modules/components/Table/hooks/usePaginationGroups.hook'
import { Tree } from '../Tree/Tree.component'

const storageHeaders = ['key', 'values']

const evaluateStorage = ({ storage = {} }) => {
  return Object.entries(storage).reduce((evaluatedStorage, [key, value]) => {
    const isValueStringifiedObject =
      typeof value === 'string' && value.startsWith('{') && value.endsWith('}')
    const isValueStringifiedArray =
      typeof value === 'string' && value.startsWith('[') && value.endsWith(']')

    return {
      ...evaluatedStorage,
      [key]:
        isValueStringifiedObject || isValueStringifiedArray
          ? JSON.parse(value)
          : value
    }
  }, {})
}

const turnStorageToTableItems = ({ storage = {} }) => {
  const parsedStorage = evaluateStorage({ storage })

  return Object.keys(parsedStorage).map((key) => {
    const values = parsedStorage[key]
    return [key, <Tree content={values} />]
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
