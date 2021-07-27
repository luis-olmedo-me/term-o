import React, { useEffect, useRef, useState } from 'react'

import terminal from 'libs/easy-terminal'

import { commands, keywords, theme } from './Commands'
import styles from './Console.styles.scss'
import { HistoryInterpreter } from './components/HistoryInterpreter/HistoryInterpreter.component'
import { CommandInput } from './components/CommandInput/CommandInput.component'
import { range } from './Helpers/range.helpers'

import resetStyles from 'src/styles/Reset.styles.scss'

terminal.setValidCommands(commands)

export const Console = ({ isOpen, options, injectedData }) => {
  const [histories, setHistories] = useState([])

  const [commandHistory, setCommandHistory] = useState([])
  const [commandHistoryId, setCommandHistoryId] = useState(-1)

  const [currentCommand, setCurrentCommand] = useState('')

  const inputRef = useRef(null)
  const historyRef = useRef(null)

  const handleCommandRun = () => {
    const parsedCurrentCommand = terminal.execute(currentCommand)

    setCommandHistory([parsedCurrentCommand[0], ...commandHistory])
    setHistories([...histories, ...parsedCurrentCommand])
    setCurrentCommand('')
    setCommandHistoryId(-1)

    setTimeout(
      () => historyRef?.current?.scrollTo(0, historyRef.current.scrollHeight),
      0
    )
  }

  const handleCommandChange = ({ target: { value: newValue } }) => {
    setCurrentCommand(newValue)
  }

  const handleKeyPressed = (key) => {
    if (key === 'enter') {
      handleCommandRun()
    } else if (key === 'arrowup' || key === 'arrowdown') {
      const direction = key !== 'arrowup' ? -1 : 1
      const nextId = commandHistoryId + direction

      const maximum = commandHistory.length
      const nextIdInRange = range(0, maximum, nextId)

      const [command] = commandHistory[nextIdInRange] || []

      setCommandHistoryId(nextIdInRange || 0)
      setCurrentCommand(command ? command.value : currentCommand)
    } else {
      setCommandHistoryId(-1)
    }
  }

  useEffect(
    function injectCommand() {
      const injectedElement = injectedData.element || ''

      setCurrentCommand((currentCommand) => {
        return currentCommand
          ? `${currentCommand} ${injectedElement}`
          : injectedElement
      })
    },
    [injectedData]
  )

  useEffect(
    function focusOnTheInput() {
      if (isOpen) {
        inputRef?.current?.focus()
      }
    },
    [isOpen]
  )

  return (
    isOpen && (
      <div className={`${styles.console_wrapper} ${resetStyles.reset_wrapper}`}>
        <div className={styles.console}>
          <h1 className={styles.title}>Console</h1>

          <HistoryInterpreter
            className={styles.console_history}
            historyRef={historyRef}
            histories={histories}
            commandKeywords={keywords}
            palette={theme}
          />

          <CommandInput
            inputRef={inputRef}
            interpreterClassName={styles.console_command_input}
            placeHolder='Write your commands here!'
            onChange={handleCommandChange}
            onKeyDown={handleKeyPressed}
            value={currentCommand}
            commandKeywords={keywords}
            palette={theme}
          />

          <div className={styles.console_options}>{options}</div>
        </div>
      </div>
    )
  )
}
