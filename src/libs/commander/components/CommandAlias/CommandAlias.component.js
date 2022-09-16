import React, { useEffect, useState, useCallback } from 'react'
import { actionTypes, parameterTypes } from '../../constants/commands.constants'
import { LogWrapper } from '../LogWrapper/LogWrapper.component'
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

export const CommandAlias = ({
  props,
  terminal: { setMessageData, command, finish }
}) => {
  const { delete: deletedIds, add: aliasesToAdd } = props

  const [tableItems, setTableItems] = useState([])

  const { buttonGroups, pages, pageNumber } = usePaginationGroups({
    items: tableItems,
    maxItems: 10
  })

  const actionType = getActionType(props)

  const handleShowList = useCallback(
    ({ aliases = [] }) => {
      if (!aliases.length) return setMessageData(aliasMessages.noAliasesFound)

      const aliasRows = aliases.map((alias) => {
        return aliasHeaders.map((aliasHeader) => alias[aliasHeader])
      })

      setTableItems(aliasRows)
      finish()
    },
    [setMessageData, finish]
  )

  const handleAddAliases = useCallback(() => {
    const validAliases = validateAliasesToAdd({ aliasesToAdd })

    const newAliasesCount = Object.keys(validAliases).length
    const hasValidAliases = newAliasesCount === validAliases.length

    if (!hasValidAliases) return setMessageData(aliasMessages.invalidAliases)

    addAliases(validAliases)
      .catch(() => setMessageData(aliasMessages.unexpectedError))
      .then(() => setMessageData(aliasMessages.aliasAdditionSuccess))
      .then(() => finish())
  }, [aliasesToAdd, setMessageData, finish])

  const handleDeleteAliases = useCallback(
    ({ aliases = [] }) => {
      const aliasIds = aliases.map(({ id }) => id)
      const validIds = deletedIds.filter((id) => aliasIds.includes(id))
      const hasInvalidIds = deletedIds.length !== validIds.length

      if (hasInvalidIds) return setMessageData(aliasMessages.noAliasIdsFound)

      deleteAliases(validIds)
        .catch(() => setMessageData(aliasMessages.unexpectedError))
        .then(() => setMessageData(aliasMessages.aliasDeletionSuccess))
        .then(() => finish())
    },
    [deletedIds, finish]
  )

  useEffect(
    function handleActionType() {
      switch (actionType) {
        case actionTypes.SHOW_LIST:
          fetchConfiguration().then(handleShowList)
          break

        case actionTypes.DELETE_ALIAS:
          fetchConfiguration().then(handleDeleteAliases)
          break

        case actionTypes.ADD_ALIAS:
          handleAddAliases()
          break

        case actionTypes.NONE:
          setMessageData(aliasMessages.unexpectedError)
          break
      }
    },
    [actionType, handleAddAliases, handleDeleteAliases, handleShowList]
  )

  const hasPages = pages.length > 0

  return (
    <>
      <LogWrapper variant={parameterTypes.COMMAND}>{command}</LogWrapper>

      <LogWrapper variant={parameterTypes.TABLE} buttonGroups={buttonGroups}>
        {hasPages && (
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
        )}
      </LogWrapper>
    </>
  )
}
