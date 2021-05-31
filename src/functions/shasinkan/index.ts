import { log, initialize, terminate, sleep, zerod } from 'helpers'

import axios from 'axios'
import data, { CoubicResponse } from './settings'

!(async () => {
  try {
    const result: any[] = []

    const now = new Date()
    let tm = new Date()
    tm.setDate(now.getDate() + 1)
    const tmrrw = `${tm.getFullYear()}-${zerod(tm.getMonth() + 1)}-${zerod(
      tm.getDate()
    )}`

    const apis = data.filter((x) => x.type === 'api')
    for (const api of apis) {
      const response = await axios.get(api.url)
      const data = response.data as CoubicResponse
      const tom = data.dates[tmrrw]
      if (tom.class === 'holiday') {
        result.push({
          name: api.name,
          percentage: 'おやすみ'
        })
      } else if (tom.class === 'active') {
        const states = tom.availabilities!.map((x) => x.state)
        const occupieds = states.filter((x) => x === 'occupied')
        result.push({
          name: api.name,
          percentage: `${((occupieds.length / states.length) * 100).toFixed(
            1
          )}%`
        })
      }
    }

    console.log(new Date().toLocaleDateString(), result)

    // const repittes = data.filter((x) => x.type === 'web')
    // console.log({ repittes })
    // const page = await initialize()
    // if (!page) return log('Failed to initialize pptr')

    // for (const repitte of repittes) {
    //   await page.goto(repitte.url)
    //   await sleep(2000, 'page load')
    // }
    // await sleep(20000 * 10, 'yay')
  } catch (e) {
    log(e)
  } finally {
    // await terminate()
  }
})()
