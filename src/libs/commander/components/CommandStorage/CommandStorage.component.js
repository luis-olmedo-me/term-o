import * as React from 'preact'
import { useCallback, useEffect, useRef, useState } from 'preact/hooks'

import { Carousel, CarouselItem } from '@modules/components/Carousel'
import { Table } from '@modules/components/Table'
import { Pencil } from 'modules/icons'
import { parameterTypes } from '../../constants/commands.constants'
import {
  EditionLog,
  LogCard,
  LogContainer,
  TableLog,
  useMessageLog,
  usePaginationActions,
  useViews
} from '../../modules/Log'
import {
  storageActionTypes,
  storageTableOptions,
  storageViewIds,
  storageViews
} from './CommandStorage.constants'
import {
  createCellActions,
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

  const editValue = entity => {
    setEditingEntity(entity)
    changeView(storageViewIds.EDITOR)
  }

  const handleShowStorage = useCallback(storage => {
    const localStorageAsTableItems = turnStorageToTableItems({ storage })
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
  const cellActions = createCellActions({ editValue })

  return (
    <LogContainer>
      {messageLog && (
        <LogCard variant={messageLog.type} command={command}>
          {messageLog.message}
        </LogCard>
      )}

      {!messageLog && (
        <Carousel itemInView={itemInView}>
          <CarouselItem>
            <TableLog
              command={command}
              maxItems={10}
              tableItems={tableItems}
              options={storageTableOptions}
              hasSelection={false}
              actions={cellActions}
            />
          </CarouselItem>

          <CarouselItem>
            <EditionLog
              editingValue={parseEntity(editingValue)}
              onApprove={newValue => handleTreeChange({ key: editingKey, newValue })}
              onReject={() => changeView(storageViewIds.MAIN)}
              command={command}
            />
          </CarouselItem>
        </Carousel>
      )}
    </LogContainer>
  )
}
