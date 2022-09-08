import styled from 'styled-components'

export const TableWrapper = styled.div`
  width: 100%;
  border-collapse: collapse;
`

export const TableRow = styled.div`
  display: flex;
  vertical-align: baseline;
  background-color: ${(props) => (props.header ? '#fafafa' : 'transparent')};
  color: ${(props) => (props.header ? '#222' : '#fafafa')};
  font-weight: ${(props) => (props.header ? 'bold' : 'normal')};
  padding: ${(props) => (props.header ? '5px 20px' : '0 20px')};
  border-radius: ${(props) => (props.header ? '5px' : '0')};
  text-align: ${(props) => (props.header ? 'center' : 'left')};
  margin-bottom: 6px;
  font-size: 1em;
  line-height: 2em;
  gap: 5px;

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
