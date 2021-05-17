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
  PageA
} from 'helpers'
import { readFile, writeFile } from 'lib/io'
import { ask, confirm } from 'lib/input'
import slctr from './selector'

const { login } = slctr
const { k } = c

const attendances = ['1472106', '1472108']

interface Profile {
  username: string
  password: string
}

async function askProfile(holder: Profile[] = []): Promise<Profile[]> {
  const add = await confirm('Do you want to add a profile?')
  if (!add) return holder
  let t = []
  const username = await ask('Type in your username')
  const password = await ask('Type in your password')
  t.push({
    username,
    password
  })
  log(`Okay. Added ${username}`)

  return await askProfile(t)
}

async function loginToMoodle(
  page: PageA,
  p: { username: string; password: string }
) {
  await page.click(login.button)
  await sleep(5 * k, 'page navigation to waseda')
  if (await page.$(slctr.notification)) {
    return log(`${p.username} already logged in`)
  }
  await typeIn(page, login.username, p.username)
  await typeIn(page, login.password, p.password)
  await Promise.all([page.click(login.submit), page.waitForNavigation()])
  await sleep(5 * k, 'page navigation')
}

async function main() {
  let profiles = await askProfile()
  const read = await readFile('moodle/profiles.txt', 'local')
  if (read) {
    const json = JSON.parse(read)
    profiles = profiles.concat(json)
  }

  try {
    const page = await initialize()
    if (!page) return log('Failed to open pptr')

    for (const profile of profiles) {
      await setCookie(page, 'moodle.' + profile.username)
      await accessSite(page, 'moodle')

      if (page.url() === login.url) await loginToMoodle(page, profile)

      for (const attendance of attendances) {
        await page.goto(slctr.attendance + attendance)
        await sleep(3 * k, 'making sure the request went through')
        await page.reload()
        await sleep(3 * k, 'making sure the request went through again')
      }

      await saveCookie(page, 'moodle.' + profile.username)
      await page.click(slctr.menu)
      await page.click(slctr.logout)
    }
  } catch (e) {
    log(e)
  } finally {
    await terminate()
    await writeFile('moodle/profiles.txt', JSON.stringify(profiles))
  }
}

main()
