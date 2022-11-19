import * as React from 'preact'
import { useCallback, useEffect, useRef, useState } from 'preact/hooks'

import { Carousel, CarouselItem } from '@modules/components/Carousel'
import { Table } from '@modules/components/Table'
import { parameterTypes } from '../../constants/commands.constants'
import { EditionLog, Log, useMessageLog, usePaginationActions, useViews } from '../../modules/Log'
import {
  storageActionTypes,
  storageTableOptions,
  storageViewIds,
  storageViews
} from './CommandStorage.constants'
import {
  getActionType,
  parseCookies,
  parseEntity,
  turnStorageToTableItems
} from './CommandStorage.helpers'
import { storageMessages } from './CommandStorage.messages'

export const CommandStorage = ({ props, terminal: { command, finish } }) => {
  const actionType = getActionType(props)

  const [tableItems, setTableItems] = useState([])
  const [editingEntity, setEditingEntity] = useState([])
  const logRef = useRef(null)

  const { log: messageLog, setMessage } = useMessageLog()
  const { paginationActions, pages, pageNumber } = usePaginationActions({
    items: tableItems,
    maxItems: 10
  })
  const { itemInView, changeView } = useViews({
    views: storageViews,
    defaultView: storageViewIds.MAIN
  })

  const handleShowStorage = useCallback(storage => {
    const editValue = entity => {
      setEditingEntity(entity)
      changeView(storageViewIds.EDITOR)
    }

    const localStorageAsTableItems = turnStorageToTableItems({ storage, editValue })
    const isEmptyStorage = localStorageAsTableItems.length === 0

    if (isEmptyStorage) throw new Error('emptyStorage')

    setTableItems(localStorageAsTableItems)
  }, [])

  const doAction = useCallback(async () => {
    switch (actionType) {
      case storageActionTypes.SHOW_LOCAL_STORAGE:
        return handleShowStorage(window.localStorage)

      case storageActionTypes.SHOW_SESSION_STORAGE:
        return handleShowStorage(window.sessionStorage)

      case storageActionTypes.SHOW_COOKIES:
        return handleShowStorage(parseCookies(document.cookie))

      case storageActionTypes.NONE:
        throw new Error('unexpectedError')
    }
  }, [actionType, handleShowStorage])

  useEffect(
    function handleActionType() {
      const handleError = error => {
        setMessage(storageMessages[error?.message] || storageMessages.unexpectedError)
        finish({ break: true })
      }

      doAction()
        .then(finish)
        .catch(handleError)
    },
    [doAction, setMessage, finish]
  )

  const handleTreeChange = ({ key, newValue }) => {
    setEditingEntity([])

    switch (actionType) {
      case storageActionTypes.SHOW_LOCAL_STORAGE:
        window.localStorage.setItem(key, newValue)
        handleShowStorage(window.localStorage)
        break

      case storageActionTypes.SHOW_SESSION_STORAGE:
        window.sessionStorage.setItem(key, newValue)
        handleShowStorage(window.sessionStorage)
        break

      case storageActionTypes.SHOW_COOKIES:
        document.cookie = `${key}=${newValue}`
        handleShowStorage(parseCookies(document.cookie))
        break
    }

    changeView(storageViewIds.MAIN)
  }

  const [editingKey, editingValue] = editingEntity

  return (
    <>
      <Log ref={logRef} variant={parameterTypes.COMMAND}>
        {command}
      </Log>

      {messageLog && <Log variant={messageLog.type}>{messageLog.message}</Log>}

      {!messageLog && (
        <Carousel itemInView={itemInView}>
          <CarouselItem>
            <Log variant={parameterTypes.TABLE} actionGroups={paginationActions}>
              <Carousel itemInView={pageNumber}>
                {pages.map((page, currentPageNumber) => {
                  return (
                    <CarouselItem key={currentPageNumber}>
                      <Table rows={page} options={storageTableOptions} widthRef={logRef} />
                    </CarouselItem>
                  )
                })}
              </Carousel>
            </Log>
          </CarouselItem>

          <CarouselItem>
            <EditionLog
              editingValue={parseEntity(editingValue)}
              onApprove={newValue => handleTreeChange({ key: editingKey, newValue })}
              onReject={() => changeView(storageViewIds.MAIN)}
            />
          </CarouselItem>
        </Carousel>
      )}
    </>
  )
}
