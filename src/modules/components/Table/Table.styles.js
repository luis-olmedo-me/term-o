import styled from 'styled-components'
import { Actions } from '../Actions'

export const TableWrapper = styled.div`
  width: 100%;
  border-collapse: collapse;
  padding: 10px;
  background-color: #00000040;
  box-sizing: border-box;
  border-radius: 3px;
`

export const TableRow = styled.div`
  display: flex;
  vertical-align: baseline;
  background-color: ${(props) => (props.header ? '#fafafa' : 'transparent')};
  color: ${(props) => (props.header ? '#222' : '#fafafa')};
  font-weight: ${(props) => (props.header ? 'bold' : 'normal')};
  padding: ${(props) => (props.header ? '1px 0' : '0')};
  border-radius: ${(props) => (props.header ? '3px 3px 0 0' : '0')};
  text-align: ${(props) => (props.header ? 'center' : 'left')};
  font-size: 1em;
  line-height: 2em;
  gap: 10px;
  margin: 0 auto 6px;

  &:last-child {
    margin-bottom: 0;
  }
`

export const TableRowValue = styled.span`
  cursor: pointer;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  position: relative;

  &&:hover {
    background-color: #f5f5f512;
    color: #f8c572;
  }

  &&:hover .actions {
    opacity: 1;
  }
`

export const TableActionsWrapper = styled.div`
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
`

export const TableActions = styled(Actions)`
  position: absolute;
  background-color: #662d9d;
  color: white;
`
