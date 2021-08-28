import {
  initialize,
  log,
  sleep,
  terminate,
  constants as c,
  PageA as Page,
  typeIn
} from 'helpers'
import { Frame } from 'puppeteer'
const { k } = c

const data = {
  firstName: '片桐',
  lastName: '優斗',
  company: 'ダニンクルーガー株式会社',
  email: 'danic@clu.com',
  phone: '03053211111',
  size: '1〜50人',
  sns: '外部会社に委託して検討している'
}

async function getHrefs(page: Page) {
  try {
    const links = await page.$$eval('.posttype-contents__item a', (items) =>
      items.map((x) => x.getAttribute('href'))
    )
    return links as string[]
  } catch {
    return []
  }
}
async function clear(page: Page | Frame, selector: string) {
  await page.$eval(selector, (el) => el.setAttribute('value', ''))
}

async function typeInInfo(page: Frame) {
  try {
    await clear(page, 'input[name="lastname"]')
    await page.type('input[name="lastname"]', data.lastName)
    await clear(page, 'input[name="firstname"]')
    await page.type('input[name="firstname"]', data.firstName)
    await clear(page, 'input[name="company"]')
    await page.type('input[name="company"]', data.company)
    await clear(page, 'input[name="email"]')
    await page.type('input[name="email"]', data.email)
    await clear(page, 'input[name="phone"]')
    await page.type('input[name="phone"]', data.phone)
    if (page.$('select[name="fint_fint"]'))
      await page.select('select[name="fint_fint"]', data.size)
    if (page.$('select[name="sns_"]'))
      await page.select('select[name="sns_"]', data.sns)

    await Promise.all([
      page.click('input[type="submit"]'),
      page.waitForNavigation()
    ])
  } catch (e) {
    log(e)
    await sleep(1 * 60 * k)
  }
}

!(async () => {
  try {
    const page = await initialize()
    if (!page) return log('failed to initialize')

    // await page.goto('https://fint.co.jp/contents/')
    // let holder: string[] = []
    // for (let i = 0; i < 20; i++) {
    //   const next = await page.$('.next')
    //   const tmp = await getHrefs(page)
    //   holder = holder.concat(tmp)
    //   if (!next) {
    //     break
    //   }
    //   await Promise.all([next.click(), page.waitForNavigation()])
    // }

    const holder = [
      // 'https://fint.co.jp/contents/14',
      // 'https://fint.co.jp/contents/13',
      // 'https://fint.co.jp/contents/12',
      // 'https://fint.co.jp/contents/11',
      // 'https://fint.co.jp/contents/10',
      // 'https://fint.co.jp/contents/009',
      // 'https://fint.co.jp/contents/20200126',
      // 'https://fint.co.jp/contents/006',
      // 'https://fint.co.jp/contents/video03',
      // 'https://fint.co.jp/contents/005',
      // 'https://fint.co.jp/contents/004',
      // 'https://fint.co.jp/contents/003',
      'https://fint.co.jp/contents/video02',
      'https://fint.co.jp/contents/video01'
    ]

    const links = []
    for (const link of holder) {
      await page.goto(link)
      const frame = page.frames().find((x) => x.name() == 'hs-form-iframe-0')
      if (frame) {
        await typeInInfo(frame)
        await sleep(3 * k)
        const url = page.url()
        log(url)
        links.push(url)
      }
    }

    console.log(links)

    await sleep(10 * 60 * k)
  } catch (e) {
    log(e)
  } finally {
    await terminate()
  }
})()
