interface Constants {
  url: {
    instagram: string
    moodle: string
    insights: string
  }
  userAgent: string
  viewport: {
    width: number
    height: number
  }
  geolocation: {
    latitude: number
    longitude: number
  }
  wait: {
    waitUntil: 'networkidle2'
  }
  s3MaxKey: number
  localStorageDir: string
  regularExpressions: {
    [key: string]: RegExp
  }
  k: 1000
}

export type PossibleUrlType = keyof Constants['url']
export const constants = <Constants>{
  url: {
    // url ends with characters not slash /
    instagram: 'https://www.instagram.com',
    moodle: 'https://wsdmoodle.waseda.jp',
    insights: 'https://business.facebook.com/creatorstudio'
  },
  userAgent:
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_0_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.67 Safari/537.36',
  viewport: { width: 1200, height: 800 },
  geolocation: { latitude: 35.6762, longitude: 139.6503 }, // tokyo
  wait: { waitUntil: 'networkidle2' },
  s3MaxKey: 100,
  localStorageDir: 'storage',
  regularExpressions: {
    instagramContent: new RegExp(
      'https://graph.facebook.com/v9.0/media_manager/media_manager_instagram_content'
    ),
    contents: new RegExp(
      'https://graph.facebook.com/v9.0/media_manager/contents'
    ),
    graphql: new RegExp('https://business.facebook.com/api/graphql/')
  },
  k: 1000
}
