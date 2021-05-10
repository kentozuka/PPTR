import { constants, log, PossibleUrlType, sleep } from 'helpers/utility'
import { PageA } from './main'

const { k } = constants

export const accessSite = async (
  page: PageA,
  target: PossibleUrlType,
  pathname: string | null = null
) => {
  const a = constants.url[target]
  const c = pathname ? `${a}/${pathname}/` : a

  let url
  try {
    new URL(c)
    url = true
  } catch (e) {
    log(e)
    url = false
  }

  if (!url) {
    log('Invalid URL, access avoided')
    return false
  }

  await page.goto(c, constants.wait)
  return true
}

export const typeIn = async (page: PageA, selector: string, body: string) => {
  const check = await page.$(selector)
  if (check) {
    log(`Typing in ${selector}`)
    await page.type(selector, body, { delay: 200 })
    await sleep(k)
    return true
  }
  log(new Error(`No selector found for ${selector}`))
  return false
}
