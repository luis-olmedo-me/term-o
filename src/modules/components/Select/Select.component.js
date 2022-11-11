import * as React from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'
import { Portal } from '../Portal/Portal.component'
import {
  DefaultTrigger,
  SelectDefaultOption,
  SelectDefaultOptionsWrapper
} from './Select.styles'

export const Select = ({
  isOpen,
  handleClickOutside,
  handleOpenSelect,
  handleOnMouseEnter,
  OptionsWrapper = SelectDefaultOptionsWrapper,
  Option = SelectDefaultOption,
  ButtonTrigger = DefaultTrigger,
  className,
  options,
  triggerRef
}) => {
  const [bounds, setBounds] = useState({})
  const [areBoundsCalculated, setAreBoundsCalculated] = useState(false)
  const optionsWrapperRef = useRef()

  useEffect(
    function closeSelectWhenUserClicksOutside() {
      if (!isOpen) return

      const clickOutside = (event) => {
        setAreBoundsCalculated(false)
        handleClickOutside(event)
      }

      window.addEventListener('click', clickOutside)
      window.addEventListener('open-term-o-select', clickOutside)

      return () => {
        window.removeEventListener('click', clickOutside)
        window.removeEventListener('open-term-o-select', clickOutside)
      }
    },
    [isOpen, handleClickOutside]
  )

  useEffect(
    function checkOptionsWrapperBounds() {
      if (!optionsWrapperRef.current && !isOpen) return

      const { top, left, right, bottom, width, height } =
        optionsWrapperRef.current.getBoundingClientRect()
      const { clientHeight: bodyHeight, clientWidth: bodyWidth } = document.body

      const halfWidth = width / 2
      const halfHeight = height / 2

      const isRightOutside = right + halfWidth > bodyWidth
      const isLeftOutside = left - halfWidth < 0
      const isBottomOutside = bottom + halfHeight > bodyHeight
      const isTopOutside = top - halfHeight < 0

      setAreBoundsCalculated(true)

      if (
        !isRightOutside &&
        !isLeftOutside &&
        !isBottomOutside &&
        !isTopOutside
      ) {
        return
      }

      setBounds(
        isLeftOutside || isTopOutside
          ? {
              left: isLeftOutside ? halfWidth + 20 : left,
              top: isTopOutside ? halfHeight + 20 : top
            }
          : {
              left: isRightOutside ? bodyWidth - halfWidth - 20 : right,
              top: isBottomOutside ? bodyHeight - halfHeight - 20 : bottom
            }
      )
    },
    [isOpen]
  )

  const openSelect = (event) => {
    event.stopPropagation()

    if (isOpen) {
      setAreBoundsCalculated(false)
      handleClickOutside(event)
      return
    }

    const openSelectEvent = new Event('open-term-o-select')

    setBounds(event.currentTarget.getBoundingClientRect())
    handleOpenSelect()

    dispatchEvent(openSelectEvent)
  }

  return (
    <div className={className}>
      <ButtonTrigger ref={triggerRef} onClick={openSelect}>
        ⋮
      </ButtonTrigger>

      <Portal>
        {isOpen && (
          <OptionsWrapper
            ref={optionsWrapperRef}
            onMouseEnter={handleOnMouseEnter}
            style={bounds && { left: bounds.left, top: bounds.top }}
            areBoundsCalculated={areBoundsCalculated}
          >
            {options.map(({ id, displayText, onClick, disabled }) => {
              const handleClick = (event) => {
                event.stopPropagation()
                setAreBoundsCalculated(false)

                onClick()
              }

              return (
                <Option
                  key={id}
                  className={disabled ? 'disabled' : ''}
                  onClick={!disabled ? handleClick : null}
                >
                  {displayText}
                </Option>
              )
            })}
          </OptionsWrapper>
        )}
      </Portal>
    </div>
  )
}
