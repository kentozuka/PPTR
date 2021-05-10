import fs from 'fs'
import path from 'path'
import S3 from 'aws-sdk/clients/s3'

import { checkEnv, constants as co, env, log } from 'helpers'

const bucket = new S3({
  accessKeyId: env.accessKeyId,
  secretAccessKey: env.secretAccessKey
})
const Bucket = env.bucketName
const cwd = process.cwd()
const resolve = (...arg: string[]) => path.resolve(cwd, ...arg)
export type Providers = 'local' | 's3'

function checkKeys() {
  const a = checkEnv('Access Key Id', 'AAKI')
  const b = checkEnv('Secret Access Key', 'ASAK')
  const c = checkEnv('Bucket Name', 'ABN')
  return [a, b, c]
}

export const checkFile = async (
  path: string,
  provider: Providers = 'local'
): Promise<boolean> => {
  if (!path) return false

  if (provider === 'local') {
    return fs.existsSync(resolve(co.localStorageDir, path))
  }

  if (provider === 's3') {
    const [a, b, c] = checkKeys()
    if (!(a && b && c)) return false

    const params = { Bucket: Bucket as string, Key: path }
    return await new Promise((resolve) =>
      bucket.headObject(params, (err) => {
        if (err) resolve(false)
        resolve(true)
      })
    )
  }
  return false
}

export const listFiles = async (
  directory: string,
  provider: Providers = 'local'
): Promise<string[]> => {
  if (!directory) {
    log(new Error('Please specify the directory'))
    return []
  }

  if (provider === 'local') {
    const pp = resolve(co.localStorageDir, directory)
    const check = fs.existsSync(pp)
    if (!check) {
      log(`No such path: ${pp}`)
      return []
    }
    const d = fs.readdirSync(pp)
    return d
  }

  if (provider === 's3') {
    const [a, b, c] = checkKeys()
    if (!(a && b && c)) return []

    const data = await bucket
      .listObjects({
        Bucket: Bucket as string,
        Prefix: directory,
        MaxKeys: co.s3MaxKey
      })
      .promise()
    if (data.Contents && data.Contents.length) {
      const del = directory + '/'
      const keys = data.Contents.map((x) => x.Key!.replace(del, ''))
      return keys.filter(String)
    }
  }

  return []
}

export const readFile = async (
  path: string,
  provider: Providers = 'local'
): Promise<string | null> => {
  if (!path) {
    log(new Error('Please specify the path'))
    return null
  }

  if (provider === 'local') {
    const pp = resolve(co.localStorageDir, path)
    const check = fs.existsSync(pp)
    if (check) {
      const data = fs.readFileSync(pp)
      return data.toString()
    }
  }

  if (provider === 's3') {
    const [a, b, c] = checkKeys()
    if (!(a && b && c)) return null

    const params = { Bucket: Bucket as string, Key: path }
    const check = await new Promise((resolve) =>
      bucket.headObject(params, (err) => {
        if (err) resolve(false)
        resolve(true)
      })
    )
    if (check) {
      const data = await bucket.getObject(params).promise()
      const type = data.ContentType
      if (type === 'text/plain') {
        return data.Body!.toString()
      }

      log(`s3: ${type} is not supported`)
    }
  }

  return null
}

export const writeFile = async (
  path: string,
  body: Buffer | string,
  provider: Providers = 'local'
): Promise<boolean> => {
  if (!path) {
    log(new Error('Please specify the path'))
    return false
  }

  if (provider === 'local') {
    const sliced = path.split('/')
    sliced.pop()
    const pcheck = sliced.length
      ? resolve(co.localStorageDir, ...sliced)
      : resolve(co.localStorageDir)
    const check = fs.existsSync(pcheck)
    if (!check) fs.mkdirSync(pcheck)

    const pp = resolve(co.localStorageDir, path)
    fs.writeFileSync(pp, body)
    return true
  }

  if (provider === 's3') {
    const [a, b, c] = checkKeys()
    if (!(a && b && c)) return false

    await bucket
      .upload({
        Bucket: Bucket as string,
        Body: body,
        ContentType: 'text/plain',
        Key: path
      })
      .promise()
    return true
  }

  return false
}

export const deleteFile = async (
  path: string,
  provider: Providers = 'local'
): Promise<boolean> => {
  if (!path) {
    log(new Error('Please specify the path'))
    return false
  }

  if (provider === 'local') {
    const pp = resolve(co.localStorageDir, path)
    const check = fs.existsSync(pp)
    if (check) {
      fs.unlinkSync(pp)
      return true
    }
  }

  if (provider === 's3') {
    const [a, b, c] = checkKeys()
    if (!(a && b && c)) return false

    const params = { Bucket: Bucket as string, Key: path }
    const check = await new Promise((resolve) =>
      bucket.headObject(params, (err) => {
        if (err) resolve(false)
        resolve(true)
      })
    )
    if (check) {
      await bucket.deleteObject(params).promise()
      return true
    }
  }

  return false
}
