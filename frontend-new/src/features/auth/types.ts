export interface AuthResponse {
  token: string;
  role: 'ADMIN' | 'USER';
  _id: string;
}
