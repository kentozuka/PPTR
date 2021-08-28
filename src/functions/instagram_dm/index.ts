import {
  accessSite,
  constants,
  initialize,
  log,
  setCookie,
  sleep,
  terminate,
  PageA as Page,
  setJapaneseForcefully
} from 'helpers'
const { k } = constants

import { mediaRegex } from './config'
import { Media } from './shortcodeMedia'
import slctr from './selector'
import Writer from './writer'

const username = 'kentozuka'

async function removeDialogIfPoppedUp(page: Page) {
  const dialog = await page.$(slctr.dialog)
  if (dialog) {
    await page.click(slctr.notNow)
  }
}

!(async () => {
  try {
    const page = await initialize()
    if (!page) return log('Failed to initialize pptr')
    await setJapaneseForcefully(page)
    await setCookie(page, username)
    await accessSite(page, 'instagram')
    await removeDialogIfPoppedUp(page)

    const writer = new Writer(page)

    page.on('response', async (response) => {
      const url = response.url()
      if (response.ok() && url.match(mediaRegex)) {
        const json: Media = await response.json()
        const {
          data: { shortcode_media: data }
        } = json
        writer.addStorage(data)
      }
    })

    await writer.watchController()
    await writer.injectCounter()
    await writer.exposeFunctions()

    await sleep(30 * 60 * k)
  } catch (e) {
    log(e)
  } finally {
    await terminate()
  }
})()
