export interface JwtPayload {
  email: string;
  exp: number;    
  iat: number;   
  role: 'warga' | 'ketua' | 'admin';
  userId: string;
}