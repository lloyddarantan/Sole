// src/controllers/otpController.ts
import { OTPPayload, AuthResponse } from '../models/Auth';

// Mock function - Replace with actual PhilSMS API call later
export const sendPhilSMSOTP = async (phone: string, purpose: 'REGISTRATION' | '2FA_LOGIN'): Promise<AuthResponse> => {
  console.log(`[PhilSMS Placeholder] Sending OTP to ${phone} for ${purpose}...`);
  
  // TODO: Replace with fetch/axios call to PhilSMS endpoint:
  // await fetch('https://api.philsms.com/v1/sms/send', { ... })

  return {
    success: true,
    message: `OTP sent successfully via PhilSMS to ${phone}`
  };
};

export const verifyPhilSMSOTP = async (payload: OTPPayload): Promise<AuthResponse> => {
  console.log(`[PhilSMS Placeholder] Verifying OTP ${payload.code} for ${payload.phone}...`);

  // Hardcoded validation for testing (Accepts "123456")
  if (payload.code === '123456') {
    return {
      success: true,
      message: 'OTP verified successfully!'
    };
  }

  return {
    success: false,
    message: 'Invalid OTP code. Please try again.'
  };
};