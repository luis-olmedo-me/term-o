import * as React from 'react'
import { Chevron } from 'src/modules/icons/Chevron.icon'
import { DoubleChevron } from 'src/modules/icons/DoubleChevron.icon'
import {
  divideItemsIntoPages,
  generateButtonGroupsFromPages
} from './usePaginationActions.helpers'

export const usePaginationActions = ({ items, maxItems }) => {
  const [pageNumber, setPageNumber] = React.useState(1)

  const itemsDividedIntoPages = divideItemsIntoPages(items, maxItems)
  const pagesAsButtonGroups = generateButtonGroupsFromPages(
    itemsDividedIntoPages,
    pageNumber,
    setPageNumber
  )
  const shouldDisplayActions = itemsDividedIntoPages.length > 1

  const paginationActions = [
    {
      id: 'go-to-first-page',
      title: 'Go to fist page',
      text: <DoubleChevron direction='left' />,
      disabled: pageNumber === 1,
      onClick: () => setPageNumber(1)
    },
    {
      id: 'go-to-previous-page',
      title: 'Go to previous page',
      text: <Chevron direction='left' />,
      onClick: () => setPageNumber(pageNumber - 1),
      disabled: pageNumber === 1
    },
    ...pagesAsButtonGroups,
    {
      id: 'go-to-next-page',
      title: 'Go to next page',
      text: <Chevron />,
      onClick: () => setPageNumber(pageNumber + 1),
      disabled: pageNumber === itemsDividedIntoPages.length
    },
    {
      id: 'go-to-last-page',
      title: 'Go to last page',
      text: <DoubleChevron />,
      disabled: pageNumber === itemsDividedIntoPages.length,
      onClick: () => setPageNumber(itemsDividedIntoPages.length)
    }
  ]

  return {
    paginationActions: shouldDisplayActions ? paginationActions : [],
    pages: itemsDividedIntoPages,
    pageNumber: pageNumber - 1
  }
}
