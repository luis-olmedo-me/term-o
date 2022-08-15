import styled from 'styled-components'

export const TableWrapper = styled.div`
  width: 100%;
  border-collapse: collapse;
`

export const TableRow = styled.div`
  display: flex;
  vertical-align: baseline;
  border-bottom: ${(props) => (props.header ? '1px solid #d6d6d6' : 'none')};
  font-weight: ${(props) => (props.header ? 'bold' : 'normal')};
  margin-bottom: 6px;

  &:last-child {
    margin-bottom: 0;
  }
`

export const TableRowValue = styled.span`
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  &&:hover {
    background-color: #f5f5f512;
  }
`
