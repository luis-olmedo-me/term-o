import { useState } from 'react'
import {
  divideItemsIntoPages,
  generateButtonGroupsFromPages
} from '../Table.helpers'

export const usePaginationGroups = ({ items, maxItems }) => {
  const [pageNumber, setPageNumber] = useState(1)

  const itemsDividedIntoPages = divideItemsIntoPages(items, maxItems)
  const currentPage = itemsDividedIntoPages[pageNumber - 1] || []
  const pagesAsButtonGroups = generateButtonGroupsFromPages(
    itemsDividedIntoPages,
    pageNumber,
    setPageNumber
  )
  const hasMoreItems = itemsDividedIntoPages.length > 0
  const shouldDisplayGroups = itemsDividedIntoPages.length > 1

  const buttonGroups = [
    {
      id: 'go-to-first-page',
      text: '<<',
      disabled: pageNumber === 1,
      onClick: () => setPageNumber(1)
    },
    {
      id: 'go-to-previous-page',
      text: '<',
      onClick: () => setPageNumber(pageNumber - 1),
      disabled: pageNumber === 1
    },
    ...pagesAsButtonGroups,
    {
      id: 'go-to-next-page',
      text: '>',
      onClick: () => setPageNumber(pageNumber + 1),
      disabled: pageNumber === itemsDividedIntoPages.length
    },
    {
      id: 'go-to-last-page',
      text: '>>',
      disabled: pageNumber === itemsDividedIntoPages.length,
      onClick: () => setPageNumber(itemsDividedIntoPages.length)
    }
  ]

  return {
    pageData: hasMoreItems ? currentPage : [],
    buttonGroups: shouldDisplayGroups ? buttonGroups : []
  }
}
