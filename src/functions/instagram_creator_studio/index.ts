import {
  initialize,
  log,
  terminate,
  accessSite,
  setCookie,
  sleep,
  saveCookie,
  constants,
  typeIn
} from 'helpers'
import {
  askLimit,
  askPace,
  chooseProfile,
  chooseProvider,
  contentUrl,
  graphUrl,
  truncateLength
} from './config'
import { InsightModifiedGraph, parseContent, parseGraph } from './parser'
import { default as ss } from './selectors'
import { Content, Graph } from 'types'
import axios from 'axios'

const { regularExpressions: r } = constants

async function main() {
  const graphHolder: InsightModifiedGraph[] = []

  try {
    const profile = await chooseProfile()
    if (!profile) return log(new Error('No profile selected'))
    const { cookieName: target, username, password, id } = profile

    const limit = await askLimit()
    const pace = await askPace()
    const provider = await chooseProvider()

    const exists = await axios.get(contentUrl, { params: { ownerId: id } })
    if (exists.status !== 200) {
      return log(
        new Error(`Database server error ${JSON.stringify(exists.data)}`)
      )
    }
    const ids = exists.data

    const page = await initialize()
    if (!page) return log(new Error('Failed to initialize pptr'))
    await setCookie(page, target, provider)
    const opend = await accessSite(page, 'insights')
    if (!opend) return null

    // when not logged in
    if (await page.$(ss.igBtnAtNavbar)) {
      await page.click(ss.igBtnAtNavbar)
      await page.click(ss.loginInWithIgBtn)
      await sleep(3 * pace)

      const browser = page.browser()
      const pages = await browser.pages()
      const popup = pages[pages.length - 1]
      await typeIn(popup, ss.usernameField, username)
      await typeIn(popup, ss.passwordField, password)
      await popup.click(ss.loginBtn)
      await sleep(3 * pace)
      await popup.click(ss.saveLaterBtn)
      await sleep(3 * pace)
    }

    page.on('response', async (res) => {
      const url = res.url()

      if (url.match(r.graphql)) {
        const json: Graph = await res.json()
        if (json && json.data) {
          const data = parseGraph(json)
          if (data) {
            graphHolder.push(data)
            log(`GRAPH-${graphHolder.length}: ${data.id}`)
          }
        }
      }

      if (url.match(r.contents)) {
        const json: Content = await res.json()
        if (json && json.data.length) {
          const data = parseContent(json.data[0])
          if (data && !ids.includes(data.id)) {
            const added = await axios.post(contentUrl, data)
            if (added.status !== 200) {
              return log(
                new Error(`Failed to add content ${JSON.stringify(added.data)}`)
              )
            }
            log(
              `CONTENT: ${data.description.trim().substring(0, truncateLength)}`
            )
          }
        }
      }
    })

    // carousel
    await page.click(ss.carouselBtn)
    await sleep(pace)

    // start clicking
    while (graphHolder.length < limit) {
      const cells = await page.$$(ss.rowCell)
      const checked = await page.$$(ss.checkedCell)
      const tips = await page.$$(ss.tooltipCell)

      const len = checked.length

      const tip = tips[2 * len]
      if (tip) {
        await tip.hover()
        await tip.click()

        page.waitForSelector(ss.modal).catch(() => log('Modal timed out'))
        await sleep(pace)
        const slided = await page.$(ss.modal)
        if (slided) {
          await page.click(ss.modalCloseBtn)
          await cells[6 * len].click()
        }
      } else {
        log('No tip')
      }
    }

    await saveCookie(page, target, provider)
  } catch (e) {
    log(e)
  } finally {
    await terminate()
    const fin = await axios.post(graphUrl, graphHolder)
    if (fin.status !== 200) log(new Error('Failed to upload metrics'))
    if (fin.status === 200) log('Successfully uploaded graphs')
  }
}

main()
