import { PageA as Page } from "./pptr";
import { log } from "./log";
import { savePhoto } from "./s3";

export const snap = async (page: Page) => {
  try {
    const now = new Date()
    const png = `${now.getTime()}.png`
    const buff = await page.screenshot()
    log('snapped')
    await savePhoto(buff as Buffer, `screenshots/${png}`)
  } catch (e) {
    log(e)
  }
}
