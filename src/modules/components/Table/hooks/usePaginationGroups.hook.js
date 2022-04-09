import { useState } from 'react'
import {
  divideElementsIntoPages,
  generateButtonGroupsFromPages
} from '../Table.helpers'

export const usePaginationGroups = ({ elements }) => {
  const [pageNumber, setPageNumber] = useState(1)

  const elementsDividedIntoPages = divideElementsIntoPages(elements, 30)
  const currentPage = elementsDividedIntoPages[pageNumber - 1] || []
  const pagesAsButtonGroups = generateButtonGroupsFromPages(
    elementsDividedIntoPages,
    pageNumber,
    setPageNumber
  )
  const hasMoreElements = elementsDividedIntoPages.length > 0
  const shouldDisplayGroups = elementsDividedIntoPages.length > 1

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
      disabled: pageNumber === elementsDividedIntoPages.length
    },
    {
      id: 'go-to-last-page',
      text: '>>',
      disabled: pageNumber === elementsDividedIntoPages.length,
      onClick: () => setPageNumber(elementsDividedIntoPages.length)
    }
  ]

  return {
    pageData: hasMoreElements ? currentPage : [],
    buttonGroups: shouldDisplayGroups ? buttonGroups : []
  }
}
