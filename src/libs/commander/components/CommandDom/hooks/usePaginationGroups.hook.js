import { useState } from 'react'

const divideElementsIntoPages = (elements, pageSize) => {
  const pages = []

  for (let index = 0; index < elements.length; index += pageSize) {
    pages.push(elements.slice(index, index + pageSize))
  }

  return pages
}

const generateButtonGroupsFromPages = (pages) => {
  const buttonGroups = []

  pages.forEach((_page, index) => {
    buttonGroups.push({
      id: `page-${index + 1}`,
      text: `${index + 1}`,
      onClick: () => setPageNumber(index + 1)
    })
  })

  return buttonGroups
}

export const usePaginationGroups = ({ elements }) => {
  const [pageNumber, setPageNumber] = useState(1)

  const elementsDividedIntoPages = divideElementsIntoPages(elements, 40)
  const currentPage = elementsDividedIntoPages[pageNumber - 1] || []
  const pagesAsButtonGroups = generateButtonGroupsFromPages(
    elementsDividedIntoPages
  )
  const hasMoreElements = elementsDividedIntoPages.length > 0

  const buttonGroups = [
    {
      id: 'go-to-previous-page',
      text: '<',
      onClick: () => setPageNumber(pageNumber - 1)
    },
    ...pagesAsButtonGroups,
    {
      id: 'go-to-next-page',
      text: '>',
      onClick: () => setPageNumber(pageNumber + 1)
    }
  ]

  return {
    pageData: hasMoreElements ? currentPage : [],
    buttonGroups
  }
}
