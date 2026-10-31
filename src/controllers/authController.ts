// src/controllers/authController.ts
import { LoginPayload, SignUpPayload, AuthResponse } from '../models/Auth';
import { supabase } from '../lib/supabaseClient';
import { sendPhilSMSOTP } from './otpController';

export const handleLogin = async (credentials: LoginPayload): Promise<AuthResponse> => {
  // Hardcoded check for demo testing
  if (credentials.usernameOrEmail && credentials.password) {
    // Trigger 2FA PhilSMS OTP send
    await sendPhilSMSOTP('+639123456789', '2FA_LOGIN');
    
    return {
      success: true,
      requiresOTP: true,
      message: 'Credentials valid. 2FA OTP code sent to your phone.'
    };
  }

  // TODO: Replace with Supabase Auth later:
  // const { data, error } = await supabase.auth.signInWithPassword({ ... })

  return {
    success: false,
    message: 'Invalid credentials.'
  };
};

export const handleSignUp = async (data: SignUpPayload): Promise<AuthResponse> => {
  if (data.password !== data.confirmPassword) {
    return { success: false, message: 'Passwords do not match.' };
  }

  // Trigger New Account Registration PhilSMS OTP send
  await sendPhilSMSOTP(data.phone, 'REGISTRATION');

  return {
    success: true,
    requiresOTP: true,
    message: 'Registration initialized. OTP sent to verify phone ownership.'
  };
};