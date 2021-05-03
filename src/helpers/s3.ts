import * as S3 from 'aws-sdk/clients/s3'
import { log } from './log'
import { env } from './util'

 // @ts-ignore
const bucket = new S3({
  accessKeyId: env.accessKeyId,
  secretAccessKey: env.secretAccessKey,
})
const Bucket = env.bucketName

export const readFile = async (Key: string) => {
  try {
    const data = await bucket.getObject({
      Bucket,
      Key
    }).promise()

    const u = data.Body.toString('utf-8')
    return u
  } catch (e) {
    log(e)
    return null
  }
}

export const writeFile = async (Body: string, Key: string) => {
  try {
    await bucket.upload({
      ContentType: 'text/plain',
      Bucket,
      Body,
      Key,
    }).promise()
  } catch (e) {
    log(e)
  }
}

export const savePhoto = async (Body: Buffer, Key: string) => {
  try {
    await bucket.putObject({
      Bucket,
      Key,
      Body,
    }).promise()
    log(`Photo saved to ${Key}`)
  } catch (e) {
    log(e)
  }
}

export const deleteFile = async (Key: string) => {
  try {
    await bucket.deleteObject({
      Bucket,
      Key
    }).promise()
  } catch (e) {
    log(e)
  }
}
