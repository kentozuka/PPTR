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
import slctr from './selector'

const { login } = slctr
const { k } = c

const u = env.wasedaUsername
const p = {
  username: u,
  password: env.wasedaPassword,
  courceId: '106918',
  cookie: 'moodle.' + u,
  cource: '84001'
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
      await sleep(2 * k)
      await typeIn(page, login.username, p.username)
      await typeIn(page, login.password, p.password)
      await page.click(login.submit)
    }

    await page.goto(slctr.course + p.cource, c.wait)
    const targets = await page.$x(slctr.slide)
    console.log(targets.length)

    await sleep(60 * k * 6)

    await saveCookie(page, p.cookie)
  } catch (e) {
    log(e)
  } finally {
    await terminate()
  }
}

main()
