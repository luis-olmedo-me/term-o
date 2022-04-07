import React, { useState, useEffect, useRef } from 'react'
import { Portal } from '../Portal/Portal.component'
import {
  SelectDefaultOption,
  SelectOptionsWrapper,
  DefaultTrigger
} from './Select.styles'

export const Select = ({
  isOpen,
  handleClickOutside,
  handleOpenSelect,
  handleOnMouseEnter,
  Option = SelectDefaultOption,
  ButtonTrigger = DefaultTrigger,
  className,
  options
}) => {
  const [bounds, setBounds] = useState({})
  const optionsWrapperRef = useRef()

  useEffect(
    function closeSelectWhenUserClicksOutside() {
      if (!isOpen) return

      window.addEventListener('click', handleClickOutside)
      window.addEventListener('open-term-o-select', handleClickOutside)

      return () => {
        window.removeEventListener('click', handleClickOutside)
        window.removeEventListener('open-term-o-select', handleClickOutside)
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

    const openSelectEvent = new Event('open-term-o-select')

    setBounds(event.currentTarget.getBoundingClientRect())
    handleOpenSelect()

    dispatchEvent(openSelectEvent)
  }

  return (
    <div className={className}>
      <ButtonTrigger onClick={openSelect}>:</ButtonTrigger>

      <Portal>
        {isOpen && (
          <SelectOptionsWrapper
            ref={optionsWrapperRef}
            onMouseEnter={handleOnMouseEnter}
            style={bounds && { left: bounds.left, top: bounds.top }}
          >
            {options.map(({ id, displayText, onClick }) => {
              const handleClick = (event) => {
                event.stopPropagation()

                onClick()
              }

              return (
                <Option key={id} onClick={handleClick}>
                  {displayText}
                </Option>
              )
            })}
          </SelectOptionsWrapper>
        )}
      </Portal>
    </div>
  )
}
