export const divideItemsIntoPages = (elements, pageSize) => {
  const pages = []

  for (let index = 0; index < elements.length; index += pageSize) {
    pages.push(elements.slice(index, index + pageSize))
  }

  return pages
}

export const generateButtonGroupsFromPages = (
  pages,
  selectedPage,
  setPageNumber
) => {
  const buttonGroups = []

  const isFirstPage = selectedPage === 1
  const isLastPage = selectedPage === pages.length
  const pageIndexes = [selectedPage - 1, selectedPage, selectedPage + 1]

  pages.forEach((_page, index) => {
    buttonGroups.push({
      id: `page-${index + 1}`,
      text: `${index + 1}`,
      onClick: () => setPageNumber(index + 1),
      disabled: false,
      selected: index + 1 === selectedPage
    })
  })

  if (isFirstPage) return buttonGroups.slice(0, 3)
  else if (isLastPage) return buttonGroups.slice(-3)
  else return buttonGroups.filter((_, index) => pageIndexes.includes(index + 1))
}
