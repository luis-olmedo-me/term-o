import styled from 'styled-components'

export const TableWrapper = styled.table`
  width: 100%;
  border-collapse: collapse;
`

export const TableHeaderRow = styled.tr`
  border-bottom: 1px solid #d6d6d6;
`

export const TableRowValue = styled.td`
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &&:hover {
    background-color: #f5f5f512;
  }
`
