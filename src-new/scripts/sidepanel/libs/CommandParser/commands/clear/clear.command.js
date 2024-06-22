import { Command } from '../Command.service'

const handleClear = command => {
  console.log('Clear', command)
}

export const createClear = script => {
  return new Command('clear', script)
    .expect({ name: 'test', type: 'string' })
    .expect({ name: 'test-1', type: 'boolean' })
    .expect({ name: 'test-2', type: 'number' })
    .expect({ name: 'test-3', type: 'array' })
    .setHandler(handleClear)
}
