import * as React from 'react'
import { useEffect, useState, useCallback } from 'react'
import { actionTypes, parameterTypes } from '../../constants/commands.constants'
import { Log } from '../../modules/Log'
import { Table } from 'modules/components/Table/Table.component'
import { aliasHeaders } from './CommandAlias.constants'
import {
  fetchConfiguration,
  addAliases,
  deleteAliases
} from 'src/helpers/event.helpers.js'
import { getActionType, validateAliasesToAdd } from './CommandAlias.helpers'
import { aliasMessages } from './CommandAlias.messages'
import { usePaginationGroups } from 'modules/components/Table/hooks/usePaginationGroups.hook'
import { Carousel } from 'modules/components/Carousel/Carousel.component'
import { CarouselItem } from 'modules/components/Carousel/Carousel.styles'

const replaceByParams = (message, params) => {
  return message.replace(/\{([^\}]+)?\}/g, (_, paramKey) => params[paramKey])
}
const useMessageLog = () => {
  const [log, setLog] = useState(null)

  const setMessageDataWithParams = useCallback((messageData, params = {}) => {
    const newMessageData = {
      ...messageData,
      message: replaceByParams(messageData.message, params)
    }

    setLog(newMessageData)
  }, [])

  return { log, setMessage: setMessageDataWithParams }
}

export const CommandAlias = ({ props, terminal: { command, finish } }) => {
  const { delete: deletedIds, add: aliasesToAdd } = props

  const [tableItems, setTableItems] = useState([])

  const { log: messageLog, setMessage } = useMessageLog()
  const { buttonGroups, pages, pageNumber } = usePaginationGroups({
    items: tableItems,
    maxItems: 10
  })

  const actionType = getActionType(props)

  const handleShowList = useCallback(
    ({ aliases = [] }) => {
      if (!aliases.length) return setMessage(aliasMessages.noAliasesFound)

      const aliasRows = aliases.map((alias) => {
        return aliasHeaders.map((aliasHeader) => alias[aliasHeader])
      })

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

    addAliases([])
      .catch(() => setMessage(aliasMessages.unexpectedError))
      .then(() => setMessage(aliasMessages.aliasAdditionSuccess))
      .then(() => finish())
  }, [aliasesToAdd, setMessage, finish])

  const handleDeleteAliases = useCallback(
    ({ aliases = [] }) => {
      const aliasIds = aliases.map(({ id }) => id)
      const validIds = deletedIds.filter((id) => aliasIds.includes(id))
      const hasInvalidIds = deletedIds.length !== validIds.length

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
        <Log variant={parameterTypes.TABLE} buttonGroups={buttonGroups}>
          <Carousel itemInView={pageNumber}>
            {pages.map((page, currentPageNumber) => {
              return (
                <CarouselItem key={currentPageNumber}>
                  <Table
                    headers={aliasHeaders}
                    rows={page}
                    widths={[20, 20, 60]}
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
