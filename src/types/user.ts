export interface Role {
  id: string;
  role: string;
}

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  background?: string;
  role_id: number;
  role: Role;
  created_at: string;
  updated_at: string;
}