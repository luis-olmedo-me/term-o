import pickColor from './pick-color.process'
import requestInput from './request-input.process'
import uploadFile from './upload-file.process'

import { processNames } from '@src/constants/process.constants'

export default {
  [processNames.PICK_COLOR]: pickColor,
  [processNames.UPLOAD_FILE]: uploadFile,
  [processNames.REQUEST_INPUT]: requestInput
}
