export interface JWTPayload {
  email: string;
  purpose: string;
}

export interface JWTDecodedPayload extends JWTPayload {
  exp: number;
  iat: number;
}
