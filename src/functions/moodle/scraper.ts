/**
 * its hela ugly but gets the job done
 */

import fs from 'fs'
import path from 'path'
import axios from 'axios'

import {
  accessSite,
  initialize,
  log,
  sleep,
  terminate,
  constants as c,
  typeIn,
  saveCookie,
  setCookie,
  env
} from 'helpers'
import { choose, confirm } from 'lib/input'
import slctr from './selector'

const { login } = slctr
const { k } = c

const u = env.wasedaUsername
const p = {
  username: u,
  password: env.wasedaPassword,
  cookie: 'moodle.' + u
}

async function main() {
  if (!(p.username && p.password)) return log('Set profile')

  try {
    const page = await initialize()
    if (!page) return log('Failed to open pptr')
    await setCookie(page, p.cookie)
    await accessSite(page, 'moodle')

    if (page.url() === login.url) {
      await page.click(login.button)
      await sleep(2 * k, 'page navigation')
      await typeIn(page, login.username, p.username)
      await typeIn(page, login.password, p.password)
      await Promise.all([page.click(login.submit), page.waitForNavigation()])
      await sleep(5 * k, 'page navigation')
    }

    await page.goto(slctr.top, c.wait)
    await sleep(4 * k, 'client js load')

    const choices = await page.$$eval(slctr.courceName, (el) =>
      el.map((x) => ({
        value: x.getAttribute('href'),
        title: x.querySelector('.multiline')!.innerHTML.trim()
      }))
    )
    const url = await choose(
      'Which couse do you want to scrape the data from?',
      choices
    )

    await page.goto(url, c.wait)
    await page.click(slctr.expand)

    const targets = await page.$x(slctr.slide)

    for (const target of targets) {
      const ins = await target.$('.instancename')
      if (!ins) continue
      await ins.hover()
      await target.click()
      await sleep(3 * k, 'slide to load')

      const pages = await page.browser().pages()
      const slide = pages.find((x) => x.url().match(slctr.content))
      if (!slide) continue

      const title = await slide.title()
      const save = await confirm(`Do you want to save ${title}`)
      if (save) {
        const id = slide.url().split('/').pop()
        const res = await axios.get(slctr.original(id!), {
          responseType: 'arraybuffer'
        })
        const dir = path.resolve(
          process.cwd(),
          'storage',
          'slides',
          `${title}.pdf`
        )
        // @ts-ignore
        fs.writeFileSync(dir, new Buffer.from(res.data), 'binary')

        log(`Download completed!`)
      }

      await slide.close()
    }

    await saveCookie(page, p.cookie)
  } catch (e) {
    log(e)
  } finally {
    await terminate()
  }
}

main()
