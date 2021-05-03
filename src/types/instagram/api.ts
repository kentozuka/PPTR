
import { PageInfo } from './shared';
import { HoverdUser, DetailedUser, ListUser } from './user'

export interface HoverResponse {
  status: string;
  user: HoverdUser;
}

export interface UserResponse {
  logging_page_id: boolean;
  show_suggested_profiles: boolean;
  show_follow_dialog: boolean;
  graphql: {
    user: DetailedUser;
  };
  toast_content_on_load: any;
  show_view_shop: boolean;
  profile_pic_edit_sync_props: any;
  always_show_message_button_to_pro_account: boolean;
}


export interface FollowersResponse {
  status: string;
  data: {
    user: {
      edge_followed_by: {
        count: number;
        page_info: PageInfo;
        edges: {
          node: ListUser;
        }[];
      }
    }
  }
}

export interface FollowingResponse {
  status: string;
  data: {
    user: {
      edge_follow: {
        count: number;
        page_info: PageInfo;
        edges: {
          node: ListUser;
        }[];
      }
    }
  }
}
