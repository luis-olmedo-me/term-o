import styled from 'styled-components'

export const ListWrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  word-break: break-word;
  padding-bottom: 10px;
  border-bottom: 1px dashed #ccc;
  margin-bottom: 10px;
  width: 100%;

  &&:last-child {
    padding-bottom: 0;
    border-bottom: 0;
    margin-bottom: 0;
  }
`
