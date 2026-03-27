import Gear from '@src/icons/Gear.icon'
import Reload from '@src/icons/Reload.icon'

export const threeDotsOptionIds = {
  REFRESH: 'refresh',
  CONFIG: 'config'
}

export const threeDotsOptions = [
  {
    id: threeDotsOptionIds.REFRESH,
    name: 'Refresh',
    Icon: Reload
  },
  {
    id: threeDotsOptionIds.CONFIG,
    name: 'Configuration',
    Icon: Gear
  }
]
