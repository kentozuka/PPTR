import { constants } from 'helpers'
import { choose, count } from 'lib/input'
import { Providers } from 'lib/io'
const { k } = constants

interface Profile {
  cookieName: string
  username: string
  password: string
  id: string
}
const profiles: Profile[] = [
  {
    cookieName: 'sheer.jp.insights',
    username: 'sheer.jp',
    password: 'Sukekanjoshidesu4',
    id: '17841445471017179'
  }
]

export const truncateLength = 18
// for local development only
// put this in the env
const base = 'http://localhost:3000/api'
export const contentUrl = base + '/contents'
export const graphUrl = base + '/metrics'

const paces = [
  {
    title: 'Fast',
    value: k
  },
  {
    title: 'Normal',
    value: 2 * k
  },
  {
    title: 'Slow',
    value: 4 * k
  }
]

const providers: {
  title: string
  value: Providers
}[] = [
  {
    title: 'AWS S3',
    value: 's3'
  },
  {
    title: 'Local',
    value: 'local'
  }
]

export const chooseProfile = async () => {
  const value = await choose(
    'Choose the profile',
    profiles.map((x) => ({
      title: `${x.username} with the cookie "${x.cookieName}"`,
      value: x.username
    }))
  )
  const profile = profiles.find((x) => x.username === value)
  if (profile) return profile
  return null
}

export const askLimit = async () => {
  const value = await count('How many should I take?')
  return value || 0
}

export const askPace = async (): Promise<number> => {
  const value = await choose('How fast should I scrape?', paces)
  return value || 2 * k
}

export const chooseProvider = async (): Promise<Providers> => {
  const value = await choose('What provider should I use?', providers)
  return value || 'local'
}
