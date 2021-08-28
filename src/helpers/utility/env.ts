require('dotenv').config()
const e = process.env

import { log } from './log'

export const env = {
  bucketName: e.ABN,
  accessKeyId: e.AAKI,
  secretAccessKey: e.ASAK,
  nodeEnv: e.NODE_ENV,
  debug: e.DEBUG == 'true',
  wasedaUsername: e.WASEDA_USERNAME,
  wasedaPassword: e.WASEDA_PASSWORD,
  kentozukaPassword: e.KENTOZUKA_PASSWORD
}

export const checkEnv = (name: string, key: string) => {
  const body = e[key]
  if (!body) {
    const t = `"${name}" is not defined, check .env for "${key}"`
    log(new Error(t))
    return false
  }

  if (env.debug) log(`"${name}" is defined in .env as [${body}]`)
  return true
}
