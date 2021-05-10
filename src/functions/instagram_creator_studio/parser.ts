import { env, log } from 'helpers'
import { Content, Graph } from 'types'

export interface InsightModifiedGraph {
  id: string
  likeCount: number
  commentCount: number
  saveCount: number
  profileVisitCount: number
  followerGainCount: number
  shareCount: number
  videoViewCount: number
  reachCount: number
  reachFromNonFollower: number
  impressionCount: number
  impressionFromFeed: number
  impressionFromProfile: number
  impressionFromHashtag: number
  impressionFromExplore: number
  impressionFromOther: number
}

export interface InsightModifiedContent {
  id: string
  ownerId: string
  ownerFullName: string
  permalinkUrl: string
  thumbnail: string
  description: string
  descriptionWithMentions: string
  commentsDisabled: boolean
  igMediaType: string
  postStatus: string
  children: string // json stringify the object
  timestamp: string
}

function notFound(data: any, key: string): boolean {
  if (!data || !data[key]) {
    if (env.debug) log(new Error(`${key} not found`))
    return true
  }
  return false
}

function extractString(data: any, key: string): string {
  if (notFound(data, key)) return ''
  return data[key] as string
}
function extractNumber(data: any, key: string): number {
  if (notFound(data, key)) return 0
  return data[key] as number
}
function extractBoolean(data: any, key: string): boolean {
  if (notFound(data, key)) return false
  return data[key] as boolean
}
function extractNestedValue<T>(data: any, fn: Function, ...path: string[]): T {
  let d: any
  let key: string = 'fallback'
  let ppp = data
  const len = path.length
  for (let i = 0; i < len; i++) {
    const k = path[i]
    if (!ppp[k]) break

    if (i === len - 1) {
      d = ppp
      key = k
    }
    ppp = ppp[k]
  }
  return fn(d, key)
}

function extractNodeValue<T>(
  data: any,
  fn: Function,
  identifier: { key: string; value: string },
  target: string,
  ...path: string[]
): T {
  let ppp = data
  const len = path.length
  for (let i = 0; i < len; i++) {
    const k = path[i]
    if (!ppp[k]) break
    ppp = ppp[k]
  }
  ppp = ppp.find((x: any) => x[identifier.key] === identifier.value)
  return fn(ppp, target)
}

export function parseGraph(json: Graph): InsightModifiedGraph | null {
  if (notFound(json.data, 'instagram_post')) return null
  const {
    data: { instagram_post: base }
  } = json

  const id = extractString(base, 'id')
  const likeCount = extractNumber(base, 'like_count')
  const commentCount = extractNumber(base, 'comment_count')
  const saveCount = extractNumber(base, 'save_count')

  if (notFound(base, 'inline_insights_node')) return null
  if (notFound(base.inline_insights_node, 'metrics')) return null
  const {
    inline_insights_node: { metrics: insights }
  } = base

  const reachCount = extractNumber(insights, 'reach_count')
  const impressionCount = extractNumber(insights, 'impression_count')
  const profileVisitCount = extractNumber(insights, 'owner_profile_views_count')
  const followerGainCount = extractNumber(
    insights,
    'owner_account_follows_count'
  )

  const shareCount = extractNestedValue<number>(
    insights,
    extractNumber,
    'share_count',
    'post',
    'value'
  )
  const videoViewCount = extractNestedValue<number>(
    insights,
    extractNumber,
    'video_views',
    'total',
    'value'
  )
  const reachFromNonFollower = extractNodeValue<number>(
    insights,
    extractNumber,
    {
      key: 'name',
      value: 'NON_FOLLOWER'
    },
    'value',
    'reach',
    'follow_status',
    'nodes'
  )
  const impressionFromFeed = extractNodeValue<number>(
    insights,
    extractNumber,
    {
      key: 'name',
      value: 'FEED'
    },
    'value',
    'impressions',
    'surfaces',
    'nodes'
  )
  const impressionFromProfile = extractNodeValue<number>(
    insights,
    extractNumber,
    {
      key: 'name',
      value: 'PROFILE'
    },
    'value',
    'impressions',
    'surfaces',
    'nodes'
  )
  const impressionFromHashtag = extractNodeValue<number>(
    insights,
    extractNumber,
    {
      key: 'name',
      value: 'HASHTAG'
    },
    'value',
    'impressions',
    'surfaces',
    'nodes'
  )
  const impressionFromExplore = extractNodeValue<number>(
    insights,
    extractNumber,
    {
      key: 'name',
      value: 'EXPLORE'
    },
    'value',
    'impressions',
    'surfaces',
    'nodes'
  )
  const est = extractNestedValue<number>(
    insights,
    extractNumber,
    'surfaces',
    'impressions',
    'value'
  )
  const impressionFromOther = impressionCount - est

  return {
    id,
    likeCount,
    commentCount,
    saveCount,
    profileVisitCount,
    followerGainCount,
    shareCount,
    videoViewCount,
    reachCount,
    reachFromNonFollower,
    impressionCount,
    impressionFromFeed,
    impressionFromProfile,
    impressionFromHashtag,
    impressionFromExplore,
    impressionFromOther
  }
}

export function parseContent(
  json: Content['data'][0]
): InsightModifiedContent | null {
  const id = extractString(json, 'id')
  const ownerId = extractString(json, 'owner_id')
  const ownerFullName = extractString(json, 'owner_name')
  const permalinkUrl = extractString(json, 'permalink_url')
  const description = extractString(json, 'description')
  const thumbnail = extractString(json, 'thumbnail_src')
  const descriptionWithMentions = extractString(
    json,
    'description_with_mentions'
  )
  const commentsDisabled = extractBoolean(json, 'comments_disabled')
  const igMediaType = extractString(json, 'ig_media_type')
  const postStatus = extractString(json, 'post_status')
  const timestamp = extractString(json, 'last_added_timestamp')

  let children = '[]'
  if (json.ig_media && json.ig_media.children) {
    children = JSON.stringify(json.ig_media.children)
  }

  return {
    id,
    ownerId,
    ownerFullName,
    permalinkUrl,
    thumbnail,
    description,
    descriptionWithMentions,
    commentsDisabled,
    igMediaType,
    postStatus,
    children,
    timestamp
  }
}
