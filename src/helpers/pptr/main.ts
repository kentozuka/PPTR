import puppeteer from 'puppeteer'
import { Browser, Page } from 'puppeteer'
import { log } from '../utility/log'

import { constants as c } from '../utility/constant'

let browser: Browser | null = null

const option = {
  headless: false,
  devtools: false,
  plain: false
}

export const initialize = async ({ headless, devtools, plain } = option) => {
  try {
    browser = await puppeteer.launch({
      headless,
      devtools
    })
    const page = await browser.newPage()
    if (!plain) {
      await page.setUserAgent(c.userAgent)
      await page.setViewport(c.viewport)
      await page.setGeolocation(c.geolocation)
    }

    log('Successfully initialized a puppeteer instance')
    return page
  } catch (e) {
    log(e)
    return null
  }
}

// should be in json but meh
const knownLanguages = {
  japanese: {
    single: 'ja-JP',
    multiple: ['ja-JP', 'ja']
  }
}

export const setJapaneseForcefully = async (page: Page) => {
  // Set the language forcefully on javascript
  const jp = knownLanguages.japanese
  // @ts-ignore
  await page.evaluateOnNewDocument((jp) => {
    Object.defineProperty(navigator, 'language', {
      get: function () {
        return jp.single
      }
    })
    Object.defineProperty(navigator, 'languages', {
      get: function () {
        return jp.multiple
      }
    })
  }, jp)
}

export const terminate = async (): Promise<boolean> => {
  try {
    if (!browser) {
      log(new Error('Browser not exists'))
      return false
    }
    await browser.close()
    log('Successfully terminated the puppeteer instance')
    return true
  } catch (e) {
    log(e)
    return false
  }
}

// because i dont want to change the every import statement
export interface BrowserA extends Browser {}
export interface PageA extends Page {}
