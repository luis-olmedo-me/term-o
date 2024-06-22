import { Command } from '../Command.service'

const handleClear = props => {
  console.log('Clear', props)
}

export const createClear = command => {
  return new Command('clear', command)
    .expect({ name: 'test', type: 'string' })
    .expect({ name: 'test-1', type: 'boolean' })
    .expect({ name: 'test-2', type: 'number' })
    .expect({ name: 'test-3', type: 'array' })
    .expect({ name: 'test-4', type: 'object' })
    .setHandler(handleClear)
}
