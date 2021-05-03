import { PageA as Page } from './main'

import { log } from "../utility/log"
import { deleteFile, readFile, writeFile } from "../aws/s3"

const pathOf = (username: string) => `cookies/${username.replace('.', '_')}.txt`

export const setCookie = async (page: Page, username: string): Promise<boolean> => {
  try {
    const key = pathOf(username)
    const dough = await readFile(key)
    if (!dough) {
      log('no dough!')
      return false
    }

    const cookies = JSON.parse(dough)
    await page.setCookie(...cookies)
    return true
  } catch (e) {
    log('failed to set cookies')
    log(e)
    return false
  }
}

export const saveCookie = async (page: Page, username: string): Promise<void> => {
  try {
    const key = pathOf(username)
    const cookie = await page.cookies()

    if (!cookie) {
      return log(`No cookie found for ${username}`)
    }

    const dough = JSON.stringify(cookie)
    await writeFile(dough, key)
    log(`Saved a new cookie for ${username}!`)
  } catch (e) {
    log('failed to save cookies')
    log(e)
  }
}

export const destroyCookie = async (username: string): Promise<void> => {
  const key = pathOf(username)
  await deleteFile(key)
  log(`Destroyed the cookie for ${username}`)
}
