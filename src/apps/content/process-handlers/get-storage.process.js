import { getCookies } from '@content/helpers/cookies.helpers'

export default async (resolve, _reject, data) => {
  let storage = {}

  if (data.includeLocal) storage = { ...localStorage }
  if (data.includeSession) storage = { ...sessionStorage }
  if (data.includeCookies) storage = getCookies()

  resolve(storage)
}
