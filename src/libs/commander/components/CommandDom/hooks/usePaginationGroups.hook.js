import { useState } from 'react'

const divideElementsIntoPages = (elements, pageSize) => {
  const pages = []

  for (let index = 0; index < elements.length; index += pageSize) {
    pages.push(elements.slice(index, index + pageSize))
  }

  return pages
}

const generateButtonGroupsFromPages = (pages, selectedPage, setPageNumber) => {
  const buttonGroups = []

  const isFirstPage = selectedPage === 1
  const isLastPage = selectedPage === pages.length
  const pageIndexes = [selectedPage - 1, selectedPage, selectedPage + 1]

  pages.forEach((_page, index) => {
    buttonGroups.push({
      id: `page-${index + 1}`,
      text: `${index + 1}`,
      onClick: () => setPageNumber(index + 1),
      disabled: false
    })
  })

  if (isFirstPage) return buttonGroups.slice(0, 3)
  else if (isLastPage) return buttonGroups.slice(-3)
  else return buttonGroups.filter((_, index) => pageIndexes.includes(index + 1))
}

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
    }
  ]

  return {
    pageData: hasMoreElements ? currentPage : [],
    buttonGroups: shouldDisplayGroups ? buttonGroups : []
  }
}
