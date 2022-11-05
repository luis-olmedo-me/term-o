import { Carousel, CarouselItem } from 'modules/components/Carousel'
import { Table } from 'modules/components/Table/Table.component'
import * as React from 'react'
import { useCallback, useEffect, useState } from 'react'
import {
  addAliases,
  deleteAliases,
  fetchConfiguration
} from 'src/helpers/event.helpers.js'
import { actionTypes, parameterTypes } from '../../constants/commands.constants'
import { Log, useMessageLog, usePaginationActions } from '../../modules/Log'
import { useTableSelection } from '../../modules/Log/hooks/useTableSelection'
import { aliasTableOptions } from './CommandAlias.constants'
import {
  getActionType,
  turnAliasesToTableItems,
  validateAliasesToAdd
} from './CommandAlias.helpers'
import { aliasMessages } from './CommandAlias.messages'

export const CommandAlias = ({ props, terminal: { command, finish } }) => {
  const { delete: deletedIds, add: aliasesToAdd } = props

  const [tableItems, setTableItems] = useState([])

  const handleDeleteAliasesFromSelection = async () => {
    const aliasIdsToDelete = selectedRows.map(([idRow]) => idRow.value)

    setSelectedRows([])

    await deleteAliases(aliasIdsToDelete)
    fetchConfiguration()
      .then(handleShowList)
      .catch(() => setMessage(aliasMessages.unexpectedError))
  }

  const { log: messageLog, setMessage } = useMessageLog()
  const { paginationActions, pages, pageNumber } = usePaginationActions({
    items: tableItems,
    maxItems: 10
  })
  const {
    selectedRows,
    setSelectedRows,
    handleAllSelection,
    handleSelectionChange,
    selectionActions
  } = useTableSelection({ handleDelete: handleDeleteAliasesFromSelection })

  const actionType = getActionType(props)

  const handleShowList = useCallback(
    ({ aliases = [] }) => {
      if (!aliases.length) return setMessage(aliasMessages.noAliasesFound)

      const aliasRows = turnAliasesToTableItems({ aliases })

      setTableItems(aliasRows)
      finish()
    },
    [setMessage, finish]
  )

  const handleAddAliases = useCallback(() => {
    const validAliases = validateAliasesToAdd({ aliasesToAdd })

    const newAliasesCount = Object.keys(validAliases).length
    const hasValidAliases = newAliasesCount === validAliases.length

    if (!hasValidAliases) return setMessage(aliasMessages.invalidAliases)

    addAliases(validAliases)
      .catch(() => setMessage(aliasMessages.unexpectedError))
      .then(() => setMessage(aliasMessages.aliasAdditionSuccess))
      .then(() => finish())
  }, [aliasesToAdd, setMessage, finish])

  const handleDeleteAliases = useCallback(
    ({ aliases = [], aliasesIdsToDelete = deletedIds }) => {
      const aliasIds = aliases.map(({ id }) => id)
      const validIds = aliasesIdsToDelete.filter((id) => aliasIds.includes(id))
      const hasInvalidIds = aliasesIdsToDelete.length !== validIds.length

      if (hasInvalidIds) return setMessage(aliasMessages.noAliasIdsFound)

      deleteAliases(validIds)
        .catch(() => setMessage(aliasMessages.unexpectedError))
        .then(() => setMessage(aliasMessages.aliasDeletionSuccess))
        .then(() => finish())
    },
    [deletedIds, finish]
  )

  useEffect(
    function handleActionType() {
      switch (actionType) {
        case actionTypes.SHOW_LIST:
          fetchConfiguration()
            .then(handleShowList)
            .catch(() => setMessage(aliasMessages.unexpectedError))
          break

        case actionTypes.DELETE_ALIAS:
          fetchConfiguration()
            .then(handleDeleteAliases)
            .catch(() => setMessage(aliasMessages.unexpectedError))
          break

        case actionTypes.ADD_ALIAS:
          handleAddAliases()
          break

        case actionTypes.NONE:
          setMessage(aliasMessages.unexpectedError)
          break
      }
    },
    [actionType, handleAddAliases, handleDeleteAliases, handleShowList]
  )

  return (
    <>
      <Log variant={parameterTypes.COMMAND}>{command}</Log>

      {messageLog && <Log variant={messageLog.type}>{messageLog.message}</Log>}

      {!messageLog && (
        <Log
          variant={parameterTypes.TABLE}
          actionGroups={[...paginationActions, ...selectionActions]}
        >
          <Carousel itemInView={pageNumber}>
            {pages.map((page, currentPageNumber) => {
              return (
                <CarouselItem key={currentPageNumber}>
                  <Table
                    rows={page}
                    options={aliasTableOptions}
                    onSelectionAll={handleAllSelection}
                    onSelectionChange={handleSelectionChange}
                    selectedRows={selectedRows}
                  />
                </CarouselItem>
              )
            })}
          </Carousel>
        </Log>
      )}
    </>
  )
}
