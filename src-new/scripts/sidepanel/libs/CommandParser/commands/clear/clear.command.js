import { Command } from '../Command.service'

export const clear = new Command()
  .expectProp({ name: 'test', type: 'string' })
  .expectProp({ name: 'test-1', type: 'boolean' })
  .expectProp({ name: 'test-2', type: 'number' })
  .expectProp({ name: 'test-3', type: 'array' })
  .expectProp({ name: 'test-4', type: 'object' })
