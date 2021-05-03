const e = process.env

export const env = {
  bucketName: e.ABN,
  accessKeyId: e.AAKI,
  secretAccessKey: e.ASAK,
}

export const sleep = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms))

export const randInt = () => (Math.floor(Math.random() * 3) + 1) * 1000

export const constants = {
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_0_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.67 Safari/537.36',
  viewport: { width: 1200, height: 800 },
  geolocation: { latitude: 35.6762, longitude: 139.6503 }, // tokyo
  origin: 'https://www.instagram.com',
  scrollHeight: 50,
  goal: 500,
  interval: 1000 * 1.5,
  selectors: {
    dialog: '[role="dialog"] div div:nth-child(2)',
    list: (username: string, type: 'following' | 'followers') => `a[href="/${username}/${type}/"]`,
    confirm: 'button[tabindex="0"]',
    anchor: (u: string) => `a[title="${u}"]`,
    login: {
      username: 'input[name="username"]',
      password: 'input[name="password"]',
      submit: 'button[type="submit"]'
    },
  },
  rex: {
    unfollow: new RegExp(/friendships\/.+\/unfollow/, 'g'),
    number: new RegExp(/\d+/, 'g'),
    apiResponse: new RegExp(/query_hash=.+variables=.+include_reel.+fetch_mutual/),
    follower: new RegExp(/query_hash=.+variables=.+include_reel.+fetch_mutual/),
    following: new RegExp(/\?__a=1/),
    userInfo: new RegExp(/https:\/\/i.instagram.com\/api\/v1\/users\/\d+\/info\//)
  }
}
