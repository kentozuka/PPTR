const variables = [
  'name',
  'theme',
  'url',
  'count',
  'username',
  'carousel'
] as const
type PossibleVariable = typeof variables[number]

export const createTextOutputFromTemplate = (
  params: { [key in PossibleVariable]: string }
) => {
  const { name, theme, url, carousel, count, username } = params

  const template = `${name} 様

はじめまして❤️
女性向けメディア「sheer」の編集部です。

突然のご連絡失礼いたします。
こちらのインスタグラム画像を
当メディア「sheer」のInstagramアカウントの
特集記事（テーマ：「${theme}」)にて
ぜひ利用させていただきたく、ご連絡致しました。

こちらのお写真を掲載させていただきたいです。
URL: ${url}
${carousel && count ? `(${count}枚目)\n` : ''}
掲載する際には、${username}の表記、タグ付けを必ずさせていただきます。
また、掲載の承諾をいただけた場合は投稿画像を取得し、保存させていただきます。

ご連絡をいただけなかった場合は、無断で掲載することはございません。
何かご不明点等ございましたら、お気軽にご連絡ください。`

  return template
}

export const mediaRegex =
  /https:\/\/www.instagram.com\/graphql\/query\/\?query_hash=.+&variables=.+shortcode/
