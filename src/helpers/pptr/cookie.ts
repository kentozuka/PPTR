import { PageA as Page } from './main'

import { writeFile, readFile, deleteFile, Providers } from 'lib/io'
import { log } from '../utility/log'

const pathOf = (username: string) =>
  `cookies/${username.replace(/\./g, '_')}.txt`

export const setCookie = async (
  page: Page,
  username: string,
  provider: Providers = 'local'
): Promise<boolean> => {
  if (!page) {
    log('Cannot set cookies because the page is not defined')
    return false
  }
  const key = pathOf(username)

  const dough = await readFile(key, provider)
  if (!dough) {
    log(`${provider}: No dough found. ${key}`)
    return false
  }

  const cookies = JSON.parse(dough)
  await page.setCookie(...cookies)
  log(`Successfully set the cookie for ${username}`)
  return true
}

export const saveCookie = async (
  page: Page,
  username: string,
  provider: Providers = 'local'
): Promise<boolean> => {
  try {
    const key = pathOf(username)
    const cookie = await page.cookies()

    if (!cookie) {
      log(`${provider}: No cookie found. ${key}`)
      return false
    }

    const dough = JSON.stringify(cookie)
    await writeFile(key, dough, provider)
    log(`Saved a new cookie for ${username}!`)
    return true
  } catch (e) {
    log('failed to save cookies')
    log(e)
    return false
  }
}

export const destroyCookie = async (
  username: string,
  provider: Providers = 'local'
): Promise<void> => {
  const key = pathOf(username)
  await deleteFile(key, provider)
  log(`Destroyed the cookie for ${username}`)
}
