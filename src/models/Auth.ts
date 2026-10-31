// src/models/Auth.ts

export interface LoginPayload {
  usernameOrEmail: string;
  password: string;
}

export interface SignUpPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface OTPPayload {
  phone: string;
  code: string;
  purpose: 'REGISTRATION' | '2FA_LOGIN';
}

export interface AuthResponse {
  success: boolean;
  message: string;
  requiresOTP?: boolean;
  token?: string;
}