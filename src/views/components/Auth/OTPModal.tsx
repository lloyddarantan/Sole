// src/views/components/Auth/OTPModal.tsx
import React, { useState } from 'react';
import { verifyPhilSMSOTP } from '../../../controllers/otpController';

interface OTPModalProps {
  isOpen: boolean;
  phone: string;
  purpose: 'REGISTRATION' | '2FA_LOGIN';
  onClose: () => void;
  onSuccess: () => void;
}

export const OTPModal: React.FC<OTPModalProps> = ({ isOpen, phone, purpose, onClose, onSuccess }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleChange = (val: string, index: number) => {
    if (!/^\d*$/.test(val)) return;
    const newOtp = [...otp];
    newOtp[index] = val.slice(-1);
    setOtp(newOtp);

    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join('');
    const res = await verifyPhilSMSOTP({ phone, code, purpose });

    if (res.success) {
      onSuccess();
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full relative shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">✕</button>
        <h3 className="text-xl font-bold text-center text-slate-800">Authentication</h3>
        <p className="text-xs text-center text-slate-500 mt-1">
          Verify your phone number for {purpose === 'REGISTRATION' ? 'Account Creation' : 'Login'}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="flex justify-between gap-2">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                id={`otp-input-${idx}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, idx)}
                className="w-10 h-12 text-center text-lg font-bold border border-slate-300 rounded-lg focus:border-[#2B41A7] focus:outline-none"
              />
            ))}
          </div>

          {error && <p className="text-xs text-red-500 text-center">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-[#2B41A7] text-white rounded-lg font-semibold hover:bg-blue-900 transition-colors"
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};