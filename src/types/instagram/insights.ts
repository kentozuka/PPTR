type ImpressionNodeNameType = 'FEED' | 'HASHTAG' | 'PROFILE'
type ProfileActionNodeNameType =
  | 'CALL'
  | 'BIO_LINK_CLICKED'
  | 'DIRECTION'
  | 'EMAIL'
  | 'TEXT'

export interface Graph {
  data: {
    instagram_post: InstagramPost
  }
  extensions: {
    is_final: boolean
  }
}

export interface Content {
  data: {
    comment_count: number
    comments_disabled: boolean
    description: string
    description_with_mentions: string
    id: string
    ig_media: IgMedia
    ig_media_type: string
    ig_media_url: string
    ig_published_media_sources: IgPublishedMediaSource[]
    is_ig_promoted_post: boolean
    is_recent_recovered_ig_post: boolean
    last_added_timestamp: number
    like_count: number
    owner_id: string
    owner_name: string
    permalink_url: string
    post_status: string // ARCHIVED || POSTED
    post_type: string // IG_STORY || IG_CAROUSEL
    reach_count: number
    scheduled_or_last_added_timestamp: number
    thumbnail_src: string
  }[]
}

interface IgPublishedMediaSource {
  media_id: string
  serialized_product_tags: string
  serialized_user_tags: string
}

interface IgMedia {
  children: {
    data: {
      id: string
      media_type: string
      media_url: string
    }[]
  }
  id: string
  media_type: string
  media_url: string
  permalink: string
}

export interface InstagramPost {
  id: string
  like_count: number
  save_count: number
  comment_count: number
  video_view_count: number | null
  inline_insights_node: {
    metrics: PostMetrics
  }
}

export interface InstagramStory {
  id: string
  creation_time: number
  taps_back_count: number
  taps_forward_count: number
  shopping_outbound_click_count: number
  inline_insights_node: {
    metrics: StoryMetrics
    state: string // "NOT_ENOUGH_REACH" || "AVAILABLE"
  }
}

interface BasicMetrics {
  impression_count: number
  owner_account_follows_count: number | null // null for sotry
  owner_profile_views_count: number
  reach_count: number
}

interface PostMetrics extends BasicMetrics {
  impressions: {
    surfaces: {
      count: number
      value: number
      nodes: ImpressionNode[]
    }
  }
  profile_actions: ProfileActions
  reach: {
    value: number
    follow_status: {
      nodes: ReachNode[]
    }
  }
  share_count: {
    post: {
      nodes: ShareCountNode[]
      value: number
    }
  }
  video_views: {
    total: {
      value: number
    }
  }
}

interface StoryMetrics extends BasicMetrics {
  story_exits_count: number
  story_link_navigation_count: number
  story_replies_count: number
  story_swipe_away_count: number
  profile_actions: ProfileActions
  share_count: ShareCount
  tags_insights: TagsInsights
}

interface BasicNode {
  name: string
  value: number
  __typename: string
}

interface ImpressionNode extends BasicNode {
  name: ImpressionNodeNameType
  __typename: 'InstagramMediaImpressionsCount'
}

interface ProfileActionNode extends BasicNode {
  name: ProfileActionNodeNameType
  __typename: 'InstagramProfileActionsWithMediaAttribution'
}

interface ProfileActions {
  actions: {
    value: number
    nodes: ProfileActionNode[]
  }
}

interface ShareCountNode extends BasicNode {
  __typename: 'InstagramMediaShareWithShareTypeAttribution'
}

interface ReachNode extends BasicNode {
  __typename: 'InstagramMediaReachCount'
}

interface ShareCount {
  shares: {
    nodes: ShareCountNode[]
  }
}

interface TagsInsights {
  hashtags: {
    tag_name: string
    tap_count: null | number
  }[]
  locations: {
    location: {
      id: string
      name: string
      __isNode: string
      __typename: string
    }
    tap_count: number | null
  }[]
  mentions: {
    user: {
      username: string
    }
    tap_count: number | null
  }[]
  product_items: any[]
}
