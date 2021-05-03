import { log } from "@/helpers/log"
import { init, terminate } from "@/helpers/pptr"
import { constants } from "@/helpers/util"

async function main () {
  const page = await init()
  if (!page) return log('Failed to open puppeteer')
  await page.goto(constants.origin)

  await terminate(page)
}

main()
