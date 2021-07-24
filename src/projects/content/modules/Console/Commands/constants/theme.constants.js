import { historyTypes } from '../../components/HistoryInterpreter/HistoryInterpreter.constants'

export const lightTheme = {
  [historyTypes.COMMAND]: {
    keyword: { color: '#E46000', fontWeight: 'bold' },
    normal: { color: '#111111', fontWeight: 'normal' },
    normal: { color: '#CCCCCC' }
  },
  [historyTypes.ELEMENT]: {
    wrapper: {
      backgroundColor: '#EC00E226',
      padding: '3px 10px',
      borderRadius: '4px'
    },
    tag: { color: '#EC00E2', fontWeight: 'bold' },
    class: { color: '#EC00E2' },
    id: { color: '#EC00E2' }
  },
  [historyTypes.PLAIN]: {
    plain: { color: '#111111' },
    plain: { color: '#CCCCCC' }
  }
}
