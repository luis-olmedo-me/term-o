import styled from 'styled-components'

export const CommandInputWrapper = styled.div`
  width: 100%;
  position: relative;
  cursor: text;
  padding: 10px 0;

  &::before {
    content: '> ';
    position: absolute;
    line-height: 30px;
    text-indent: 1ch;
    font-size: 1.2em;
  }

  .empty-interpeter span {
    color: #888 !important;
  }
`
export const CommandInputContent = styled.input`
  width: 100%;
  position: absolute;
  height: 100%;
  opacity: 0;
  border: none;
  box-sizing: border-box;
  pointer-events: none;
`
