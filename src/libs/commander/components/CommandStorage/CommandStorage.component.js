import * as React from 'react'
import { useEffect, useState, useCallback } from 'react'
import { parameterTypes } from '../../constants/commands.constants'
import { Log, useMessageLog, usePaginationActions } from '../../modules/Log'
import { Table } from 'modules/components/Table/Table.component'
import {
  getActionType,
  parseCookies,
  evaluateStringifiedValue
} from './CommandStorage.helpers'
import { storageMessages } from './CommandStorage.messages'
import { storageActionTypes, storageHeaders } from './CommandStorage.constants'
import { Carousel } from 'modules/components/Carousel/Carousel.component'
import { CarouselItem } from 'modules/components/Carousel/Carousel.styles'
import { MaterialTree } from './CommandStorage.styles'

const storageViews = {
  MAIN: 0,
  EDITOR: 1
}

export const CommandStorage = ({ props, terminal: { command, finish } }) => {
  const actionType = getActionType(props)

  const [tableItems, setTableItems] = useState([])
  const [itemInView, setItemInView] = useState(storageViews.MAIN)
  const [editingText, setEditingText] = useState(storageViews.MAIN)

  const { log: messageLog, setMessage } = useMessageLog()
  const { paginationActions, pages, pageNumber } = usePaginationActions({
    items: tableItems,
    maxItems: 10
  })

  const handleShowStorage = useCallback(
    (storage) => {
      const localStorageAsTableItems = Object.entries(storage).map(
        ([key, value]) => {
          const editValue = ({ value }) => {
            setEditingText(value)
            setItemInView(storageViews.EDITOR)
          }

          return [{ value: key }, { value, onClick: editValue }]
        }
      )

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

  const handleHeadToTable = () => {
    setItemInView(storageViews.MAIN)
    setEditingText('')
  }

  const headToTable = {
    id: 'head-to-table',
    text: '<☶',
    onClick: handleHeadToTable
  }

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
              {editingText && (
                <MaterialTree
                  content={evaluateStringifiedValue(editingText)}
                  isKeyEditionEnabled
                  isValueEditionEnabled
                  handleChange={(newValue) => console.log(newValue)}
                />
              )}
            </Log>
          </CarouselItem>
        </Carousel>
      )}
    </>
  )
}
