import * as React from 'preact'
import { useCallback, useEffect, useState } from 'preact/hooks'

import { addAliases, deleteAliases, fetchConfiguration } from '@src/helpers/event.helpers.js'
import { LogCard, LogContainer, TableLog, useMessageLog } from '../../modules/Log'
import { aliasActionTypes, aliasTableOptions, MAX_ITEMS } from './CommandAlias.constants'
import { getActionType, validateAliasesToAdd } from './CommandAlias.helpers'
import { aliasMessages } from './CommandAlias.messages'

export const CommandAlias = ({ props, terminal: { command, finish } }) => {
  const [tableItems, setTableItems] = useState([])

  const { log: messageLog, setMessage } = useMessageLog()

  const actionType = getActionType(props)

  const handleShowList = useCallback(async () => {
    const { aliases = [] } = await fetchConfiguration()

    const hasAliases = aliases.length > 0

    if (!hasAliases) throw new Error('noAliasesFound')

    setTableItems(aliases)
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

  const onError = error =>
    setMessage(eventMessages[error?.message] || eventMessages.unexpectedError)
  const handleDeleteAliasesFromSelection = async ({ selectedRows }) => {
    const aliasIdsToDelete = selectedRows.map(({ id }) => id)

    await deleteAliases(aliasIdsToDelete).catch(onError)
    await handleShowList().catch(onError)
  }

  return (
    <LogContainer>
      {messageLog && (
        <LogCard variant={messageLog.type} command={command}>
          {messageLog.message}
        </LogCard>
      )}

      {!messageLog && (
        <TableLog
          command={command}
          maxItems={MAX_ITEMS}
          tableItems={tableItems}
          options={aliasTableOptions}
          onSelectionDelete={handleDeleteAliasesFromSelection}
          hasSelection
        />
      )}
    </LogContainer>
  )
}
