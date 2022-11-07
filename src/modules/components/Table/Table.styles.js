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
  background-color: transparent;
  color: #fafafa;
  font-weight: normal;
  padding: 0;
  border-radius: 0;
  text-align: left;
  font-size: 1em;
  line-height: 2em;
  gap: 10px;
  margin: 0 auto 6px;

  &.header {
    background-color: #fafafa;
    color: #222222;
    font-weight: bold;
    padding: 1px 0;
    border-radius: 3px 3px 0 0%;
    text-align: center;
  }

  &.selected {
    color: #f8c572;
  }

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
  text-align: ${(props) => (props.center ? 'center' : 'left')};
  flex-grow: ${(props) => (props.hasFixedWidth ? 'unset' : '1')};

  &:hover {
    background-color: #f5f5f512;
    color: #f8c572;
  }

  &:hover .actions {
    opacity: 1;
  }
`

export const TableHeaderRowValue = styled.span`
  width: ${(props) => props.width};
  flex-grow: ${(props) => (props.hasFixedWidth ? 'unset' : '1')};
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
