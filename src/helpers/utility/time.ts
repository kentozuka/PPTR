import { log } from './log'
import { numberWithComma } from './number'

const hrstart = process.hrtime()

export const second = () => {
  const c = process.hrtime(hrstart)
  return `${c[0]}` // second
}

export const sleep = (ms: number, reason: string = '') => {
  const txt = `Sleeping ${(ms / 1000).toFixed(1)}s ${
    reason ? `for ${reason}` : `(${numberWithComma(ms)}ms)`
  }`
  return new Promise((resolve) => {
    log(txt)
    setTimeout(resolve, ms)
  })
}

export const getTime = () => {
  return Math.floor(new Date().getTime() / 1000)
}

export const zerod = (x: number) => {
  return x > 9 ? `${x}` : `0${x}`
}
