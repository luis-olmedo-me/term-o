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
  color: #444;
  background-color: #fafafa;
`

export const SelectDefaultOptionsWrapper = styled.div`
  all: initial;
  position: fixed;
  z-index: 1000003;
  background-color: #fff;
  inset: 0;
  width: 100%;
  height: fit-content;
  max-width: 220px;
  max-height: 150px;
  border-radius: 3px;
  transform: translate(-50%, -50%);
  font-family: Coda;
  box-shadow: 0 0 15px 5px #0000002a;
  padding: 10px 0;
  overflow-y: scroll;
  font-size: 1em;
  opacity: ${(props) => (props.areBoundsCalculated ? 1 : 0)};

  && {
    scrollbar-width: auto;
    scrollbar-color: #333 #ffffff;
  }

  &&::-webkit-scrollbar {
    width: 12px;
  }

  &&::-webkit-scrollbar-track {
    background: #ffffff;
    border-radius: 0 3px 3px 0;
    border-left: 1px solid #eaeaea;
  }

  &&::-webkit-scrollbar-thumb {
    background-color: #333;
    border-radius: 5px;
    border: 3px solid #ffffff;
  }
`

export const SelectDefaultOption = styled.div`
  line-height: 2.4em;
  vertical-align: middle;
  text-align: center;
  border-top: 1px solid #eaeaea;
  cursor: pointer;
  color: #333;
  transition: all 0.2s ease-in-out;

  &&.disabled {
    color: #888;
    background-color: #eaeaea;

    &:hover {
      background-color: #eaeaea;
    }
  }

  &&:last-child {
    border-bottom: 1px solid #eaeaea;
  }
`
