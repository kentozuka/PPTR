import { sleep, typeIn } from 'helpers'
import { createTextOutputFromTemplate } from './config'

export default class Writer {
  constructor(page) {
    this.title = ''
    this.storage = []
    this.jobs = []
    this.page = page
  }

  async initializeUI() {
    await this.page.evaluate(() => {
      const empty = document.createElement('div')
      empty.setAttribute('id', 'controller')
      empty.setAttribute(
        'style',
        'position: fixed; top: 120px; left: 10px; display: flex; flex-direction: column; border-radius: 8px; border: 1px solid #eee; box-shadow: 1px 1px 4px 1px #dedede9c; padding: 0 1rem 1rem; background-color: #fff; z-index: 999;'
      )
      const header = document.createElement('span')
      header.setAttribute('id', 'header')
      header.setAttribute('style', 'cursor: grab; width: 100%; height: 24px')
      empty.innerHTML = `
        <div style="display: flex;flex-direction: row;align-items: center;">
          <input type="text" id="theme" value="" placeholder="テーマを入力" style="border: none; border-bottom: 1px solid #999; margin: 0.4rem 0; padding: 0.3rem;">
          <p onClick="window.updateTitle()" style="padding: 0.2rem; cursor: pointer;">🆙</p>
        </div>
        <p style="margin: 0; font-size: 0.8rem;">合計<span id="length">0</span>件</p>
        <ul id="list" style="width: 100%; max-height: 16rem; overflow: scroll; margin: 0; padding: 0.2rem; list-style: none;">
        </ul>
        <small onClick="window.reset()" style="text-align: center; margin: 0.4rem 0; cursor: pointer;">RESET</small>
        <button onClick="window.sendAll()" id="send" style="cursor: pointer; background-color: rgb(69, 164, 241); color: #fff; border: none; padding: 0.4rem 0; border-radius: 4px;">送信</button>
      `

      let move = false
      header.onmousedown = () => (move = true)
      const getCenter = (num, sub) => num - Math.floor(sub / 2) + 'px'
      empty.onmousemove = (e) => {
        if (move) {
          header.style.cursor = 'move'
          const width = empty.offsetWidth
          const height = header.offsetHeight
          empty.style.top = getCenter(e.y, height)
          empty.style.left = getCenter(e.x, width)
        }
      }
      header.onmouseup = () => {
        header.style.cursor = 'grab'
        move = false
      }
      empty.prepend(header)

      document.body.prepend(empty)
    })
  }

  async mountCounter() {
    await this.page.evaluate(() => {
      setTimeout(() => {
        const exist = document.getElementById('counter') // backup plan
        if (!exist) {
          const target = document.querySelector(
            'article[role="presentation"] li[role="menuitem"]'
          )
          target.style.color = 'red'
          const test = document.createElement('div')
          test.setAttribute('id', 'counter')
          test.setAttribute(
            'style',
            'display: flex; flex-direction: column; padding: 1rem'
          )
          test.innerHTML = `
              <input type="number" name="count" placeholder="何枚目？">
              <button onClick="window.passItem()" style="padding: 0.4rem 0.8rem;border-radius: 6px;border: none;background-color: rgb(69, 164, 241);margin-top: 4px;color: #fff; cursor: pointer;">追加</button>
              `
          target.parentElement.prepend(test)
        }
      }, 1000)
    })
  }

  async injectCounter() {
    setInterval(async () => {
      try {
        const url = await this.page.url()
        const exsit = await this.page.$('#counter')
        if (url.match(/.+\/p\/.{11}\//) && !exsit) {
          const codes = this.jobs.map((x) => x.code)
          const listed = codes.some((x) => url.indexOf(x) !== -1)
          if (!listed) {
            await this.mountCounter()
          }
        }
      } catch (e) {}
    }, 500)
  }

  async watchController() {
    setInterval(async () => {
      try {
        const cont = await this.page.$('#controller')
        if (!cont) {
          await this.initializeUI()
          await this.syncUI()
        }
      } catch {}
    }, 3000)
  }

  getChild(data, num) {
    const ix = num - 1
    return data.edges[ix].node.display_url
  }

  createModifiedData(code, count) {
    const filt = this.storage.find((x) => x.shortcode == code)
    if (!filt) return null
    const isCarousel = filt.hasOwnProperty('edge_sidecar_to_children')
    const {
      owner: { username, full_name: name },
      display_url: thumbnail
    } = filt
    const preview =
      isCarousel && count
        ? this.getChild(filt.edge_sidecar_to_children, +count)
        : thumbnail

    return {
      name,
      username,
      isCarousel,
      preview,
      count,
      code
    }
  }

  async syncUI(data = null) {
    if (!data) {
      data = {
        title: this.title,
        jobs: this.jobs
      }
    }

    await this.page.evaluate(({ title, jobs }) => {
      const controller = document.getElementById('controller')
      const length = controller.querySelector('#length')
      const theme = controller.querySelector('#theme')
      const list = controller.querySelector('#list')
      length.innerText = jobs.length
      theme.value = title

      const size = 100
      list.innerHTML = ''
      for (const job of jobs) {
        if (!job.sent) {
          const tmp = document.createElement('li')
          tmp.setAttribute(
            'style',
            `display: grid; grid-template-columns: ${size}px 120px 30px 10px; align-items: center; padding-bottom: 0.3rem;`
          )
          tmp.innerHTML = `
          <img src="${job.preview}" width="${size}" height="${size}" style="object-fit: contain;">
          <p style="padding: 0 6px;margin: 0;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">${job.username}</p>
          <input type="number" name="counter" value="${job.count}">
          <span onClick="window.removeJob('${job.code}')" style="padding: 0.2rem; cursor: pointer; color: red;">×</span>
          `
          list.prepend(tmp)
        }
      }
    }, data)
  }

  async addStorage(data) {
    this.storage.push(data)
  }

  async sendDM(job) {
    await this.page.evaluate(() => {
      const path = document.querySelector(
        'path[d="M33.7 44.12H8.5a8.41 8.41 0 01-8.5-8.5v-25.2a8.41 8.41 0 018.5-8.5H23a1.5 1.5 0 010 3H8.5a5.45 5.45 0 00-5.5 5.5v25.2a5.45 5.45 0 005.5 5.5h25.2a5.45 5.45 0 005.5-5.5v-14.5a1.5 1.5 0 013 0v14.5a8.41 8.41 0 01-8.5 8.5z"]'
      )
      path.closest('button').click()
    })
    const username = job.username
    await typeIn(this.page, 'input[name="queryBox"]', username)
    await this.page.waitForSelector('div[role="dialog"] div[role="button"]')
    const possibleUser = await this.page.$x(
      `//div[@role="button"][ancestor::div[@role="presentation"]//div[text()="${username}"]]`
    )
    await possibleUser[0].click()

    const btns = await this.page.$$('div[role="dialog"] button')
    await btns[1].click()

    await sleep(2000)

    const text = createTextOutputFromTemplate({
      name: job.name,
      username,
      theme: this.title,
      url: `https://www.instagram.com/p/${job.code}/`,
      carousel: job.isCarousel,
      count: job.count
    })

    await this.page.evaluate(
      ({ selector, text }) => {
        const field = document.querySelector(selector)
        field.value = text
      },
      { selector: 'textarea[placeholder]', text }
    )
    await this.page.click('textarea[placeholder]')
    await this.page.keyboard.press('Space')
    await this.page.keyboard.press('Enter')
    // remove jobs
  }

  async exposeFunctions() {
    await this.page.exposeFunction('updateTitle', async () => {
      this.title = await this.page.$eval('#controller #theme', (el) => el.value)
    })

    await this.page.exposeFunction('passItem', async () => {
      const url = await this.page.url()
      const value = await this.page.$eval('#counter input', (el) => el.value)
      const code = url.match(/\/.{11}\//g)[0].replace(/\//g, '')
      const tmp = {
        sent: false,
        ...this.createModifiedData(code, value)
      }
      this.jobs.push(tmp)

      await this.syncUI()
    })

    await this.page.exposeFunction('removeJob', async (code) => {
      const codes = this.jobs.map((x) => x.code)
      const ix = codes.indexOf(code)
      if (ix != -1) {
        this.jobs.splice(ix, 1)
      }
      await this.syncUI()
    })

    await this.page.exposeFunction('sendAll', async () => {
      const dia = await this.page.$('div[role="dialog"]')
      if (dia) await dia.click()
      await sleep(2000, 'dialog closing')

      await this.page.click('a[href="/direct/inbox/"]')
      await sleep(4000, 'inbox navigation change')

      for (const job of this.jobs) {
        await this.sendDM(job)
        await sleep(3000, 'rest')
      }
    })

    await this.page.exposeFunction('reset', async () => {
      this.title = ''
      this.storage = []
      this.jobs = []

      await this.syncUI()
    })
  }
}
