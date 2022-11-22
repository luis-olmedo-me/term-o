import * as React from 'preact'
import { useCallback, useEffect, useRef, useState } from 'preact/hooks'

import { Carousel, CarouselItem } from '@modules/components/Carousel'
import { Table } from '@modules/components/Table/Table.component'
import { addAliases, deleteAliases, fetchConfiguration } from '@src/helpers/event.helpers.js'
import { parameterTypes } from '../../constants/commands.constants'
import {
  LogCard,
  LogContainer,
  useMessageLog,
  usePaginationActions,
  useTableSelection
} from '../../modules/Log'
import { aliasActionTypes, aliasTableOptions, MAX_ITEMS } from './CommandAlias.constants'
import {
  getActionType,
  turnAliasesToTableItems,
  validateAliasesToAdd
} from './CommandAlias.helpers'
import { aliasMessages } from './CommandAlias.messages'

export const CommandAlias = ({ props, terminal: { command, finish } }) => {
  const [tableItems, setTableItems] = useState([])
  const logRef = useRef(null)

  const onError = error =>
    setMessage(eventMessages[error?.message] || eventMessages.unexpectedError)
  const handleDeleteAliasesFromSelection = async ({ selectedRows }) => {
    const aliasIdsToDelete = selectedRows.map(([idRow]) => idRow.value)

    clearSelection()

    await deleteAliases(aliasIdsToDelete).catch(onError)
    await handleShowList().catch(onError)
  }

  const { log: messageLog, setMessage } = useMessageLog()
  const { paginationActions, pages, pageNumber, changePage } = usePaginationActions({
    items: tableItems,
    maxItems: MAX_ITEMS
  })
  const { clearSelection, tableSelectionProps, selectionActions } = useTableSelection({
    changePage,
    onDelete: handleDeleteAliasesFromSelection,
    currentRows: pages[pageNumber],
    tableItems,
    pages,
    maxItems: MAX_ITEMS
  })

  const actionType = getActionType(props)

  const handleShowList = useCallback(async () => {
    const { aliases = [] } = await fetchConfiguration()

    const aliasRows = turnAliasesToTableItems({ aliases })
    const hasAliases = aliases.length > 0

    if (!hasAliases) throw new Error('noAliasesFound')

    setTableItems(aliasRows)
  }, [setMessage])

  const handleAddAliases = useCallback(async () => {
    const validAliases = validateAliasesToAdd({ aliasesToAdd: props.add })

    const newAliasesCount = Object.keys(validAliases).length
    const hasValidAliases = newAliasesCount === validAliases.length

    if (!hasValidAliases) throw new Error('invalidAliases')

    await addAliases(validAliases)
    setMessage(aliasMessages.aliasAdditionSuccess)
  }, [props, setMessage])

  const handleDeleteAliases = useCallback(async () => {
    const { aliases = [] } = await fetchConfiguration()

    const aliasIds = aliases.map(({ id }) => id)
    const validIds = props.delete.filter(id => aliasIds.includes(id))
    const hasInvalidIds = props.delete.length !== validIds.length

    if (hasInvalidIds) throw new Error('noAliasIdsFound')

    await deleteAliases(validIds)
    setMessage(aliasMessages.aliasDeletionSuccess)
  }, [props])

  const doAction = useCallback(async () => {
    switch (actionType) {
      case aliasActionTypes.SHOW_LIST:
        return await handleShowList()

      case aliasActionTypes.DELETE_ALIAS:
        return await handleDeleteAliases()

      case aliasActionTypes.ADD_ALIAS:
        return await handleAddAliases()

      case aliasActionTypes.NONE:
        throw new Error('unexpectedError')
    }
  }, [actionType, handleShowList, handleDeleteAliases, handleAddAliases])

  useEffect(
    function handleActionType() {
      const handleError = error => {
        setMessage(aliasMessages[error?.message] || aliasMessages.unexpectedError)
        finish({ break: true })
      }

      doAction()
        .then(finish)
        .catch(handleError)
    },
    [doAction, setMessage, finish]
  )

  return (
    <LogContainer>
      {messageLog && (
        <LogCard variant={messageLog.type} command={command}>
          {messageLog.message}
        </LogCard>
      )}

      {!messageLog && (
        <LogCard
          variant={parameterTypes.TABLE}
          actions={[...paginationActions, ...selectionActions]}
          command={command}
        >
          <Carousel itemInView={pageNumber}>
            {pages.map((page, currentPageNumber) => {
              return (
                <CarouselItem key={currentPageNumber}>
                  <Table
                    {...tableSelectionProps}
                    rows={page}
                    options={aliasTableOptions}
                    widthRef={logRef}
                  />
                </CarouselItem>
              )
            })}
          </Carousel>
        </LogCard>
      )}
    </LogContainer>
  )
}
