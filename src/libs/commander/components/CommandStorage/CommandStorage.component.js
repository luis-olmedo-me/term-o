import * as React from 'react'
import { useEffect, useState, useCallback } from 'react'
import { parameterTypes } from '../../constants/commands.constants'
import {
  Log,
  useMessageLog,
  usePaginationActions,
  useViews
} from '../../modules/Log'
import { Table } from 'modules/components/Table/Table.component'
import {
  getActionType,
  parseCookies,
  evaluateStringifiedValue,
  turnStorageToTableItems
} from './CommandStorage.helpers'
import { storageMessages } from './CommandStorage.messages'
import {
  storageActionTypes,
  storageHeaders,
  storageViewIds,
  storageViews
} from './CommandStorage.constants'
import { Carousel, CarouselItem } from 'modules/components/Carousel'
import { MaterialTree } from './CommandStorage.styles'

export const CommandStorage = ({ props, terminal: { command, finish } }) => {
  const actionType = getActionType(props)

  const [tableItems, setTableItems] = useState([])
  const [editingEntity, setEditingEntity] = useState([])

  const { log: messageLog, setMessage } = useMessageLog()
  const { paginationActions, pages, pageNumber } = usePaginationActions({
    items: tableItems,
    maxItems: 10
  })
  const { viewActions, itemInView, changeView } = useViews({
    views: storageViews,
    defaultView: storageViewIds.MAIN
  })

  const handleShowStorage = useCallback(
    (storage) => {
      const editValue = (entity) => {
        setEditingEntity(entity)
        changeView(storageViewIds.EDITOR)
      }
      const localStorageAsTableItems = turnStorageToTableItems({
        storage,
        editValue
      })

      const isEmptyStorage = localStorageAsTableItems.length === 0

      if (isEmptyStorage) return setMessage(storageMessages.emptyStorage)

      setTableItems(localStorageAsTableItems)
    },
    [setMessage]
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
          setMessage(storageMessages.unexpectedError)
          break
      }
    },
    [actionType, handleShowStorage, finish]
  )

  const handleTreeChange = ({ key, newValue }) => {
    const stringifiedNewValue = JSON.stringify(newValue)
    setEditingEntity([key, stringifiedNewValue])

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

  const [editingKey, editingValue] = editingEntity
  const [headToTable] = viewActions

  return (
    <>
      <Log variant={parameterTypes.COMMAND}>{command}</Log>

      {messageLog && <Log variant={messageLog.type}>{messageLog.message}</Log>}

      {!messageLog && (
        <Carousel itemInView={itemInView}>
          <CarouselItem>
            <Log
              variant={parameterTypes.TABLE}
              actionGroups={paginationActions}
            >
              <Carousel itemInView={pageNumber}>
                {pages.map((page, currentPageNumber) => {
                  return (
                    <CarouselItem key={currentPageNumber}>
                      <Table
                        headers={storageHeaders}
                        rows={page}
                        widths={[20, 80]}
                      />
                    </CarouselItem>
                  )
                })}
              </Carousel>
            </Log>
          </CarouselItem>

          <CarouselItem>
            <Log
              variant={parameterTypes.TABLE}
              actionGroups={[headToTable]}
              hasScroll
            >
              {editingEntity.length && (
                <MaterialTree
                  content={evaluateStringifiedValue(editingValue)}
                  isKeyEditionEnabled
                  isValueEditionEnabled
                  handleChange={(newValue) =>
                    handleTreeChange({ key: editingKey, newValue })
                  }
                />
              )}
            </Log>
          </CarouselItem>
        </Carousel>
      )}
    </>
  )
}
