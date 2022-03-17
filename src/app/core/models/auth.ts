export enum Role {
  Student = 'STUDENT',
  Teacher = 'TEACHER'
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  name: string;
  nickname?: string;
  password1: string;
  password2: string;
  birth_date?: string;
  account_type: Role;
  invite_key?: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}

export interface User {
  id: string;
  name: string;
  account_type: Role;
  createdAt?: string;
  updatedAt?: string;
  email?: string;
  nickname?: string;
  last_seen?: string;
}

export interface Student extends User {
  assigned_exams: number[];
}

export interface DecodedToken {
  user_id: string;
  token_type: string;
  jti: number;
  exp: number;
}
