import styled from 'styled-components'

export const DefaultTrigger = styled.button`
  height: 100%;
  line-height: 100%;
  display: inline-block;
  vertical-align: middle;
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: 0 10px;
  transition: all 0.2s ease-in-out;
  font-size: 1em;
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

export const SelectDefaultOption = styled.div`
  line-height: 40px;
  vertical-align: middle;
  text-align: center;
  border-bottom: 1px solid #eaeaea;
  cursor: pointer;
  color: #333;
  transition: all 0.2s ease-in-out;

  &&.disabled {
    color: #888;
    background-color: #00000007;

    &:hover {
      background-color: transparent;
    }
  }

  &&:first-child {
    border-radius: 3px 3px 0 0;
  }
  &&:last-child {
    border-bottom: none;
    border-radius: 0 0 3px 3px;
  }
`
