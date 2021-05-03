import {
  log,
  init,
  terminate,
  constants
} from 'helpers'

async function main () {
  const page = await init()
  if (!page) return log('Failed to open puppeteer')
  await page.goto(constants.origin)

  await terminate(page)
}

main()
