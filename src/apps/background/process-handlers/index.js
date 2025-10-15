import { processNames } from '@src/constants/process.constants'
import getFontsAvailable from './get-fonts-available.process'

export default {
  [processNames.GET_FONTS_AVAILABLE]: getFontsAvailable
}
