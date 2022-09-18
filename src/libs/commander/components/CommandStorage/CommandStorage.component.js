import React, { useEffect, useState, useCallback } from 'react'
import { parameterTypes } from '../../constants/commands.constants'
import { Log } from '../Log/Log.component'
import { Table } from 'modules/components/Table/Table.component'
import {
  getActionType,
  getParseTableValuesForLocalStoageItems,
  turnStorageToTableItems,
  parseCookies
} from './CommandStorage.helpers'
import { storageMessages } from './CommandStorage.messages'
import { usePaginationGroups } from 'modules/components/Table/hooks/usePaginationGroups.hook'
import { storageActionTypes, storageHeaders } from './CommandStorage.constants'
import { Carousel } from 'modules/components/Carousel/Carousel.component'
import { CarouselItem } from 'modules/components/Carousel/Carousel.styles'

export const CommandStorage = ({
  props,
  terminal: { command, setMessageData, finish }
}) => {
  const actionType = getActionType(props)

  const [tableItems, setTableItems] = useState([])

  const { buttonGroups, pages, pageNumber } = usePaginationGroups({
    items: tableItems,
    maxItems: 10
  })

  const handleShowStorage = useCallback(
    (storage) => {
      const localStorageAsTableItems = turnStorageToTableItems({
        storage
      })

      const isEmptyStorage = localStorageAsTableItems.length === 0

      if (isEmptyStorage) return setMessageData(storageMessages.emptyStorage)

      setTableItems(localStorageAsTableItems)
    },
    [setMessageData]
  )

  useEffect(
    function handleActionType() {
      switch (actionType) {
        case storageActionTypes.SHOW_LOCAL_STORAGE:
          handleShowStorage(window.localStorage)
          finish()
          break

        case storageActionTypes.SHOW_SESSION_STORAGE:
          handleShowStorage(window.sessionStorage)
          finish()
          break

        case storageActionTypes.SHOW_COOKIES:
          handleShowStorage(parseCookies(document.cookie))
          finish()
          break

        case storageActionTypes.NONE:
          setMessageData(storageMessages.unexpectedError)
          break
      }
    },
    [actionType, handleShowStorage, finish]
  )

  const handleTreeChange = ({ key, newValue }) => {
    const stringifiedNewValue = JSON.stringify(newValue)

    switch (actionType) {
      case storageActionTypes.SHOW_LOCAL_STORAGE:
        window.localStorage.setItem(key, stringifiedNewValue)
        handleShowStorage(window.localStorage)
        break

      case storageActionTypes.SHOW_SESSION_STORAGE:
        window.sessionStorage.setItem(key, stringifiedNewValue)
        handleShowStorage(window.sessionStorage)
        break

      case storageActionTypes.SHOW_COOKIES:
        document.cookie = `${key}=${stringifiedNewValue}`
        handleShowStorage(parseCookies(document.cookie))
        break
    }
  }

  const parseTableValuesForLocalStoageItems =
    getParseTableValuesForLocalStoageItems(handleTreeChange)

  return (
    <>
      <Log variant={parameterTypes.COMMAND}>{command}</Log>

      <Log variant={parameterTypes.TABLE} buttonGroups={buttonGroups}>
        <Carousel itemInView={pageNumber}>
          {pages.map((page, currentPageNumber) => {
            return (
              <CarouselItem key={currentPageNumber}>
                <Table
                  headers={storageHeaders}
                  rows={page}
                  parseValue={parseTableValuesForLocalStoageItems}
                  widths={[20, 80]}
                />
              </CarouselItem>
            )
          })}
        </Carousel>
      </Log>
    </>
  )
}
