import {
  log,
  saveCookie,
  initialize,
  terminate,
  setCookie,
  accessSite,
  sleep,
  constants,
  typeIn,
  env
} from 'helpers'
import { downloadImage } from 'lib/image'
import { confirm } from 'lib/input'

import path from 'path'
import fs from 'fs'

import { TimelineMedia, UnderA, NODE } from './customTypes'
import slcts from './selectors'

const k = constants.k
const username = 'kentozuka'

const urlsFromEdges = (nnn: { node: NODE }[]) => {
  return nnn.map((x) => ({
    src: x.node.thumbnail_src,
    user: x.node.owner.username,
    id: x.node.shortcode
  }))
}

const downloadAll = async (
  data: { id: string; user: string; src: string }[]
) => {
  const base = path.resolve(process.cwd(), 'storage', 'posts')
  for (const item of data) {
    const p = path.resolve(base, item.user)
    const exist = fs.existsSync(p)
    if (!exist) fs.mkdirSync(p)

    await downloadImage(item.src, path.resolve(p, item.id + '.jpeg'))
  }
}

!(async () => {
  try {
    const page = await initialize()
    if (!page) return log('Failed to initialize pptr')
    await setCookie(page, username)
    await accessSite(page, 'instagram')

    if (await page.$(slcts.loginForm)) {
      await typeIn(page, slcts.usernameField, username)
      await typeIn(page, slcts.passwordField, env.kentozukaPassword!)
      await page.click(slcts.loginBtn)
      await sleep(5 * k, 'login to resolve')
    }

    page.on('response', async (res) => {
      const url = res.url()
      if (url.endsWith('?__a=1')) {
        const response: UnderA = await res.json()
        const {
          graphql: {
            user: {
              edge_owner_to_timeline_media: { edges }
            }
          }
        } = response

        const urls = urlsFromEdges(edges)
        await downloadAll(urls)
      }

      if (url.match(/query_hash=.+first.+after/)) {
        const response: TimelineMedia = await res.json()
        const {
          data: {
            user: {
              edge_owner_to_timeline_media: { edges }
            }
          }
        } = response
        const urls = urlsFromEdges(edges)
        await downloadAll(urls)
      }
    })

    await confirm('should i end now?')

    await saveCookie(page, username)
  } catch (e) {
    log(e)
  } finally {
    await terminate()
  }
})()
