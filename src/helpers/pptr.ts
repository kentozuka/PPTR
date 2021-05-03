import * as puppeteer from 'puppeteer'
import { Browser, Page } from 'puppeteer'
import { log } from './log'

import { constants as c } from './util'

export const init = async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      devtools: true
    })
    const page = await browser.newPage()
    await page.setUserAgent(c.userAgent)
    await page.setViewport(c.viewport)
    await page.setGeolocation(c.geolocation)

    return page
  } catch (e) {
    log(e)
    return null
  }
}

export const terminate = async (page: Page) => {
  try {
    if (!page) return log('Page not provided')
    const browser = page.browser()
    await browser.close()
  } catch (e) {
    log(e)
  }
}

// because i dont want to change the every import statement
export interface BrowserA extends Browser { }
export interface PageA extends Page { }
