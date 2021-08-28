export interface NODE {
  accessibility_caption: string
  comments_disabled: boolean
  dimensions: { height: number; width: number }
  display_url: string
  edge_liked_by: { count: number }
  edge_media_preview_like: { count: number }
  edge_media_to_caption: { edges: any[] }
  edge_media_to_comment: { count: number }
  edge_media_to_tagged_user: { edges: any[] }
  fact_check_information: any
  fact_check_overall_rating: any
  gating_info: any
  id: string
  is_video: boolean
  location: any
  media_overlay_info: any
  media_preview: string
  owner: { id: string; username: string }
  sharing_friction_info: {
    should_have_sharing_friction: boolean
    bloks_app_url: any
  }
  shortcode: string
  taken_at_timestamp: number
  thumbnail_resources: {
    config_height: number
    config_width: number
    src: string
  }[]
  thumbnail_src: string
  __typename: string
}

export interface UnderA {
  always_show_message_button_to_pro_account: boolean
  graphql: {
    user: {
      biography: string
      blocked_by_viewer: boolean
      business_address_json: any
      business_category_name: string
      business_contact_method: any
      business_email: any
      business_phone_number: any
      category_enum: any
      category_name: string
      connected_fb_page: any
      country_block: boolean
      edge_felix_video_timeline: {
        count: number
        page_info: {
          end_cursor: string | null
          has_next_page: boolean
        }
        edges: any[]
      }
      edge_follow: {
        count: number
      }
      edge_followed_by: {
        count: number
      }
      edge_media_collections: {
        count: number
        page_info: {
          end_cursor: string | null
          has_next_page: boolean
        }
        edges: any[]
      }
      edge_mutual_followed_by: { count: number; edges: any[] }
      edge_owner_to_timeline_media: {
        count: number
        page_info: {
          end_cursor: string | null
          has_next_page: boolean
        }
        edges: {
          node: NODE
        }[]
      }
      edge_saved_media: {
        count: number
        page_info: {
          end_cursor: string | null
          has_next_page: boolean
        }
        edges: any[]
      }
      external_url: string
      external_url_linkshimmed: string
      fbid: string
      followed_by_viewer: boolean
      follows_viewer: boolean
      full_name: string
      has_ar_effects: boolean
      has_blocked_viewer: boolean
      has_channel: boolean
      has_clips: boolean
      has_guides: boolean
      has_requested_viewer: boolean
      hide_like_and_view_counts: boolean
      highlight_reel_count: number
      id: string
      is_business_account: boolean
      is_joined_recently: boolean
      is_private: boolean
      is_professional_account: boolean
      is_verified: boolean
      overall_category_name: any
      profile_pic_url: string
      profile_pic_url_hd: string
      requested_by_viewer: boolean
      restricted_by_viewer: boolean
      should_show_category: boolean
      should_show_public_contacts: boolean
      username: string
    }
  }
  logging_page_id: string
  profile_pic_edit_sync_props: any
  seo_category_infos: string[][]
  show_follow_dialog: boolean
  show_suggested_profiles: boolean
  show_view_shop: boolean
  toast_content_on_load: any
}

export interface TimelineMedia {
  data: {
    user: {
      edge_owner_to_timeline_media: {
        count: number
        edges: {
          node: NODE
        }[]
        page_info: {
          end_cursor: string | null
          has_next_page: boolean
        }
      }
    }
  }
  status: string
}
