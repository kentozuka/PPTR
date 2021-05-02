import { TaggedUserNode } from "./user";

export interface MediaNode {
  accessibility_caption: string;
  comments_disabled: boolean;
  dimensions: {
    height: number;
    width: number;
  }
  display_url: string;
  edge_liked_by: {
    count: number;
  }
  edge_media_preview_like: {
    count: number;
  }
  edge_media_to_caption: {
    edges: {
      node: {
        text: string;
      }
    }[]
  }
  edge_media_to_comment: {
    count: number;
  }
  edge_media_to_tagged_user: {
    edges: {
      node: TaggedUserNode[];
    }
  }
  edge_sidecar_to_children: {
    edges: {
      node: {
        accessibility_caption: string;
        dimensions: {
          height: number;
          width: number;
        }
        display_url: string;
        edge_media_to_tagged_user: {
          edges: {
            node: TaggedUserNode[];
          }
        }
        fact_check_information: any;
        fact_check_overall_rating: any;
        gating_info: any;
        id: string;
        is_video: boolean;
        media_overlay_info: any;
        media_preview: string;
        owner: { id: string; }
        sharing_friction_info: {
          should_have_sharing_friction: boolean;
          bloks_app_url: string | null;
        }
        shortcode: string;
        __typename: string;
      }
    }[];
  }
  fact_check_information: null
  fact_check_overall_rating: null
  gating_info: null
  id: string;
  is_video: boolean;
  location: null
  media_overlay_info: null
  media_preview: null
  owner: {
    id: string;
  }
  sharing_friction_info: {
    should_have_sharing_friction: boolean;
    bloks_app_url: any;
  }
  shortcode: string;
  taken_at_timestamp: number;
  thumbnail_resources: any[];
  thumbnail_src: string;
  __typename: string;
}