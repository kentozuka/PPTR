import { MediaNode } from './media';
import { PageInfo } from './shared'

export interface HoverdUser {
  account_badges: []
  account_type: number;
  auto_expand_chaining: boolean;
  address_street?: string;
  biography: string;
  business_contact_method?: string;
  can_be_reported_as_fraud: boolean;
  can_hide_category?: boolean;
  can_hide_public_contacts?: boolean;
  category?: string;
  charity_profile_fundraiser_info?: {
    pk: number;
    is_facebook_onboarded_charity: boolean;
    has_active_fundraiser: boolean;
    consumption_sheet_config: {
      can_viewer_donate: boolean;
      currency: string | null;
      donation_amount_config: {
        default_selected_donation_value: any;
        donation_amount_selector_values: any;
        maximum_donation_amount: any;
        minimum_donation_amount: any;
        prefill_amount: any;
        user_currency: any;
      }
      donation_disabled_message: string;
      donation_url: string | null;
      privacy_disclaimer: string | null;
      you_donated_message: string | null;
    }
  }
  city_id?: number;
  city_name?: string;
  contact_phone_number?: string;
  direct_messaging?: string;
  displayed_action_button_partner?: string | null;
  displayed_action_button_type?: string;
  external_lynx_url?: string;
  external_url: string;
  fb_page_call_to_action_id?: string;
  follower_count: number;
  following_count: number;
  following_tag_count: number;
  full_name: string;
  has_active_charity_business_profile_fundraiser?: boolean;
  has_anonymous_profile_picture: boolean;
  has_guides: boolean;
  has_highlight_reels: boolean;
  has_igtv_series?: boolean;
  has_unseen_besties_media: boolean;
  has_videos: boolean;
  hd_profile_pic_url_info: {
    width: number;
    height: number;
    url: string;
  }
  hd_profile_pic_versions: {
    width: number;
    height: number;
    url: string;
  }[]
  highlight_reshare_disabled: boolean;
  include_direct_blacklist_status: boolean;
  instagram_location_id?: string;
  is_bestie: boolean;
  is_business: boolean;
  is_call_to_action_enabled: null
  is_facebook_onboarded_charity?: boolean;
  is_favorite: boolean;
  is_interest_account: boolean;
  is_memorialized: boolean;
  is_potential_business: boolean;
  is_private: boolean;
  is_verified: boolean;
  latitude?: number;
  longitude?: number;
  media_count: number;
  merchant_checkout_style?: string;
  mutual_followers_count: number;
  num_visible_storefront_products?: number;
  open_external_url_with_in_app_browser: boolean;
  pk: number;
  professional_conversion_suggested_account_type: number;
  profile_context?: string;
  profile_context_links_with_user_ids?: {
    start: number;
    end: number;
    username: string;
  }[];
  profile_context_mutual_follow_ids?: string[];
  profile_pic_id: string;
  profile_pic_url: string;
  public_email?: string;
  public_phone_country_code?: string;
  public_phone_number?: string;
  seller_shoppable_feed_type?: string;
  service_shop_onboarding_status?: string | null;
  shoppable_posts_count?: number;
  should_show_category?: boolean;
  should_show_public_contacts?: boolean;
  show_account_transparency_details: boolean;
  show_post_insights_entry_point: boolean;
  show_service_shop_profile_cta?: boolean;
  show_shoppable_feed?: boolean;
  smb_delivery_partner?: any;
  smb_support_delivery_partner?: any;
  storefront_attribution_username?: any;
  total_ar_effects: number;
  total_clips_count?: number;
  total_igtv_videos: number;
  username: string;
  usertags_count: number;
  whatsapp_number: string;
  zip?: string;
}

export interface DetailedUser {
  account_badges?: any[];
  account_type?: number;
  auto_expand_chaining?: boolean;
  biography: string;
  blocked_by_viewer: boolean;
  business_category_name: any;
  category_enum: any;
  category_name: any;
  connected_fb_page: any;
  country_block: boolean;
  edge_felix_video_timeline: {
    count: number;
    page_info: PageInfo;
    edges: any[];
  }
  edge_follow: {
    count: number;
  }
  edge_followed_by: {
    count: number;
  }
  edge_media_collections: {
    count: number;
    page_info: PageInfo;
    edges: any[];
  }
  edge_mutual_followed_by: {
    count: number;
    edges: {
      node: {
        username: string;
      }
    }[];
  }
  edge_owner_to_timeline_media: {
    count: number;
    page_info: PageInfo;
    edges: MediaNode[];
  }
  edge_saved_media: {
    count: number;
    page_info: PageInfo;
    edges: any[];
  }
  external_url: string;
  external_url_linkshimmed: string;
  fbid: string;
  followed_by_viewer: true
  follows_viewer: true
  full_name: string;
  has_ar_effects: boolean;
  has_blocked_viewer: boolean;
  has_channel: boolean;
  has_clips: boolean;
  has_guides: boolean;
  has_requested_viewer: boolean;
  highlight_reel_count: number;
  id: string;
  is_business_account: boolean;
  is_joined_recently: true
  is_private: true
  is_professional_account: boolean;
  is_verified: boolean;
  overall_category_name: any;
  profile_pic_url: string;
  profile_pic_url_hd: string;
  requested_by_viewer: boolean;
  restricted_by_viewer: boolean;
  should_show_category: boolean;
  username: string;
}

export interface TaggedUserNode {
  user: {
    full_name: string;
    id: string;
    is_verified: boolean;
    profile_pic_url: string;
    username: string;
  }
  x: number;
  y: number;
}

export interface ListUser {
  followed_by_viewer: boolean;
  follows_viewer: boolean;
  full_name: string;
  id: string;
  is_private: boolean;
  is_verified: boolean;
  profile_pic_url: string;
  reel: {
    id: string;
    expiring_at: number;
    has_pride_media: boolean;
    latest_reel_media: any;
    owner: {
      id: string;
      profile_pic_url: string;
      username: string;
      __typename: string;
    }
    seen: boolean | null;
  }
  requested_by_viewer: boolean;
  username: string;
}
