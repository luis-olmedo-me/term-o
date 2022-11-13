import { Carousel, CarouselItem } from 'modules/components/Carousel'
import { Table } from 'modules/components/Table/Table.component'
import * as React from 'preact'
import { useCallback, useEffect, useState } from 'preact/hooks'
import { addAliases, deleteAliases, fetchConfiguration } from 'src/helpers/event.helpers.js'
import { actionTypes, parameterTypes } from '../../constants/commands.constants'
import { Log, useMessageLog, usePaginationActions, useTableSelection } from '../../modules/Log'
import { aliasTableOptions } from './CommandAlias.constants'
import {
  getActionType,
  turnAliasesToTableItems,
  validateAliasesToAdd
} from './CommandAlias.helpers'
import { aliasMessages } from './CommandAlias.messages'

export const CommandAlias = ({ props, terminal: { command, finish } }) => {
  const [tableItems, setTableItems] = useState([])

  const handleDeleteAliasesFromSelection = async ({ selectedRows }) => {
    const aliasIdsToDelete = selectedRows.map(([idRow]) => idRow.value)
    const onError = () => setMessage(aliasMessages.unexpectedError)

    clearSelection()

    await deleteAliases(aliasIdsToDelete).catch(onError)
    await handleShowList().catch(onError)
  }

  const { log: messageLog, setMessage } = useMessageLog()
  const { paginationActions, pages, pageNumber } = usePaginationActions({
    items: tableItems,
    maxItems: 10
  })
  const { clearSelection, tableSelectionProps, selectionActions } = useTableSelection({
    handleSkullClick: handleDeleteAliasesFromSelection,
    currentRows: pages[pageNumber],
    isEnabled: props.now
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
      case actionTypes.SHOW_LIST:
        return await handleShowList()

      case actionTypes.DELETE_ALIAS:
        return await handleDeleteAliases()

      case actionTypes.ADD_ALIAS:
        return await handleAddAliases()

      case actionTypes.NONE:
        throw new Error('unexpectedError')
    }
  }, [actionType, handleShowList, handleDeleteAliases, handleAddAliases])

  useEffect(
    function handleActionType() {
      const handleError = error => {
        setMessage(aliasMessages[error.message] || aliasMessages.unexpectedError)
        return { break: true }
      }

      doAction()
        .catch(handleError)
        .finally(finish)
    },
    [doAction, setMessage, finish]
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
                  <Table {...tableSelectionProps} rows={page} options={aliasTableOptions} />
                </CarouselItem>
              )
            })}
          </Carousel>
        </Log>
      )}
    </>
  )
}
