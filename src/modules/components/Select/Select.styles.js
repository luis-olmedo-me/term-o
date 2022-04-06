import styled from 'styled-components'

export const Trigger = styled.button`
  height: -webkit-fill-available;
  display: block;
`

export const SelectOptionsWrapper = styled.div`
  all: initial;
  position: fixed;
  z-index: 1000003;
  background-color: #fff;
  inset: 0;
  width: 100%;
  height: fit-content;
  max-width: 150px;
  max-height: 150px;
  border-radius: 3px;
  transform: translate(-50%, -50%);
  font-family: Coda;
  box-shadow: 0 0 3px 1px #00000020;
`

export const SelectOption = styled.div`
  line-height: 40px;
  vertical-align: middle;
  text-align: center;
  border-bottom: 1px solid #eaeaea;
  cursor: pointer;
  color: #333;

  &&:last-child {
    border-bottom: none;
  }
`
