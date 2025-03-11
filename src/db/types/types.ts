export interface ProjectsType {
  id: string;
  created_at: string;
  updated_at?: string;
  title?: string;
  start_date?: string;
  end_date?: string;
  user_id: string;
  wp_link?: string;
  wp_message?: string;
  wp_numbers?: string[];
  redirect_to?: number;
}

export interface UserType {
  id: string;
  created_at: string;
  updated_at?: string;
  country?: string;
  email?: string;
  first_name?: string;
  plan?: string;
  user_id?: string;
  subscription_status?: string;
  role?: string;
  account_id?: string;
  kiwify_subscription_id?: string;
  last_name?: string;
}
