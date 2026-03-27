import Gear from '@src/icons/Gear.icon'
import Skull from '@src/icons/Skull.icon'

export const threeDotsOptionIds = {
  KILL: 'kill',
  CONFIG: 'config'
}

export const threeDotsOptions = [
  {
    id: threeDotsOptionIds.KILL,
    name: 'Kill',
    Icon: Skull
  },
  {
    id: threeDotsOptionIds.CONFIG,
    name: 'Configuration',
    Icon: Gear
  }
]
