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
  attendances: ['1472106', '1472108']
}

async function main() {
  if (p.username && p.password) return log('Set profile')

  try {
    const page = await initialize()
    if (!page) return log('Failed to open pptr')
    await setCookie(page, p.cookie)
    await accessSite(page, 'moodle')

    if (page.url() === login.url) {
      await page.click(login.button)
      await sleep(2 * k)
      await typeIn(page, login.username, p.username as string)
      await typeIn(page, login.password, p.password as string)
      await page.click(login.submit)
    }

    for (const attendance of p.attendances) {
      await page.goto(slctr.attendance + attendance)
      await sleep(3 * k)
      await page.reload()
      await sleep(3 * k)
    }

    await saveCookie(page, p.cookie)
  } catch (e) {
    log(e)
  } finally {
    await terminate()
  }
}

main()
