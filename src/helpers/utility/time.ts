import { log } from './log'
import { numberWithComma } from './number'

const hrstart = process.hrtime()

export const second = () => {
  const c = process.hrtime(hrstart)
  return `${c[0]}` // second
}

export const sleep = (ms: number) =>
  new Promise((resolve) => {
    log(`Sleeping ${(ms / 1000).toFixed(1)}s (${numberWithComma(ms)}ms)`)
    setTimeout(resolve, ms)
  })

export const getTime = () => {
  return new Date().getTime() / 1000
}
